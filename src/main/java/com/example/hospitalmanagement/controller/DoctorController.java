package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.entity.Doctor;
import com.example.hospitalmanagement.entity.Appointment;
import com.example.hospitalmanagement.service.DoctorService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.saveDoctor(doctor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable Long id, @RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, doctor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/specialization/{name}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String name) {
        return ResponseEntity.ok(doctorService.getDoctorsBySpecialization(name));
    }

    @GetMapping("/{id}/appointments")
        public ResponseEntity<List<Appointment>> getAppointmentsByDoctor(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getAppointmentsByDoctor(id));
    }

    @GetMapping("/department/{deptId}")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable Long deptId) {
        return ResponseEntity.ok(doctorService.getDoctorsByDepartment(deptId));
    }
}
