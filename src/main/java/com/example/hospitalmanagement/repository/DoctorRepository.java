package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    // Find doctors by specialization
    List<Doctor> findBySpecialization(String specialization);

    // Find doctors by department id (many-to-many)
    @Query("SELECT d FROM Doctor d JOIN d.departments dept WHERE dept.id = :deptId")
    List<Doctor> findByDepartmentId(@Param("deptId") Long deptId);
}