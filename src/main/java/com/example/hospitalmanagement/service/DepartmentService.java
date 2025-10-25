package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.entity.Department;
import com.example.hospitalmanagement.entity.Doctor;
import com.example.hospitalmanagement.repository.DepartmentRepository;
import com.example.hospitalmanagement.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final DoctorRepository doctorRepository;

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    public Department getDepartmentById(Long id) {
        return departmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Department not found with id: " + id));
    }

    public Department saveDepartment(Department department) {
        // Fetch existing doctors by ID to ensure valid references
        Set<Doctor> attachedDoctors = new HashSet<>();
        for (Doctor d : department.getDoctors()) {
            Doctor existingDoctor = doctorRepository.findById(d.getId())
                    .orElseThrow(() -> new RuntimeException("Doctor not found with ID " + d.getId()));
            attachedDoctors.add(existingDoctor);
        }

        // Attach valid doctor set and head doctor
        department.setDoctors(attachedDoctors);

        if (department.getHeadDoctor() != null) {
            Doctor head = doctorRepository.findById(department.getHeadDoctor().getId())
                    .orElseThrow(() -> new RuntimeException("Head doctor not found"));
            department.setHeadDoctor(head);
        }

        return departmentRepository.save(department);
    }

    public Department updateDepartment(Long id, Department departmentDetails) {
        Department department = getDepartmentById(id); // throws exception if not found

        department.setName(departmentDetails.getName());

        // Update HeadDoctor if provided
        if (departmentDetails.getHeadDoctor() != null) {
            department.setHeadDoctor(departmentDetails.getHeadDoctor());
        }

        // Update doctors set if provided
        if (departmentDetails.getDoctors() != null && !departmentDetails.getDoctors().isEmpty()) {
            department.setDoctors(departmentDetails.getDoctors());
        }

        return departmentRepository.save(department);
    }

    @Transactional
    public void deleteDepartment(Long id) {
        Department department = getDepartmentById(id); // throws exception if not found

        // Unlink from doctors (ManyToMany)
        for (Doctor doctor : department.getDoctors()) {
            doctor.getDepartments().remove(department); // remove link from doctor side
        }
        department.getDoctors().clear(); // clear department side

        // Unlink HeadDoctor (OneToOne)
        department.setHeadDoctor(null);

        // Now safely delete the department
        departmentRepository.delete(department);
    }

    public List<Doctor> getDoctorsByDepartment(Long id) {
        Department department = getDepartmentById(id);
        return department.getDoctors().stream().collect(Collectors.toList());
    }

    public Doctor getHeadDoctor(Long id) {
        Department department = getDepartmentById(id);
        Doctor headDoctor = department.getHeadDoctor();
        if (headDoctor == null) {
            throw new RuntimeException("Head doctor not assigned for department id: " + id);
        }
        return headDoctor;
    }
}
