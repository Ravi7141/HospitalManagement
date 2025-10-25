package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId(Long patientId);
    // Find all appointments by doctor id
    List<Appointment> findByDoctorId(Long doctorId);
}