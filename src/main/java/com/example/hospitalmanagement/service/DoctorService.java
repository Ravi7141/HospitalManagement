package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.entity.Appointment;
import com.example.hospitalmanagement.entity.Doctor;
import com.example.hospitalmanagement.repository.AppointmentRepository;
import com.example.hospitalmanagement.repository.DepartmentRepository;
import com.example.hospitalmanagement.repository.DoctorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DoctorService {

    private  final DoctorRepository doctorRepository;
    private final DepartmentRepository departmentRepository;
    private  final AppointmentRepository appointmentRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Transactional
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor saveDoctor = getDoctorById(id);
        saveDoctor.setName(doctor.getName());
        saveDoctor.setSpecialization(doctor.getSpecialization());
        saveDoctor.setEmail(doctor.getEmail());
        // Update departments if provided
        if (doctor.getDepartments() != null && !doctor.getDepartments().isEmpty()) {
            saveDoctor.setDepartments(doctor.getDepartments());
        }

        return saveDoctor; // changes will be persisted due to @Transactional
    }

    @Transactional
    public void deleteDoctor(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id " + id));

        // Remove doctor from all departments
        doctor.getDepartments().forEach(department -> department.getDoctors().remove(doctor));


        // Save departments to update relationships
        departmentRepository.saveAll(doctor.getDepartments());

        // Finally, delete the doctor
        doctorRepository.delete(doctor);
    }

    public List<Doctor> getDoctorsBySpecialization(String name) {
        return doctorRepository.findBySpecialization(name);
    }

    public List<Appointment> getAppointmentsByDoctor(Long id) {
        getDoctorById(id); // validate doctor exists
        return appointmentRepository.findByDoctorId(id);
    }

    public List<Doctor> getDoctorsByDepartment(Long deptId) {
        return doctorRepository.findByDepartmentId(deptId);
    }
}
