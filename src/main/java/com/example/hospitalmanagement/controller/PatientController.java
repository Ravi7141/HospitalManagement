package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.entity.Appointment;
import com.example.hospitalmanagement.dto.BloodGroupCountResponseEntity;
import com.example.hospitalmanagement.service.PatientService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Patient patient = patientService.getPatientById(id);
        return (patient != null) ? ResponseEntity.ok(patient) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Patient> createPatient(@RequestBody Patient patient) {
        Patient saved = patientService.savePatient(patient);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patient) {
        Patient updated = patientService.updatePatient(id, patient);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/blood-group/{group}")
    public ResponseEntity<List<Patient>> getByBloodGroup(@PathVariable String group) {
        return ResponseEntity.ok(patientService.getPatientsByBloodGroup(group));
    }

    @GetMapping("/count-by-blood-group")
    public ResponseEntity<List<BloodGroupCountResponseEntity>> getBloodGroupCount() {
        return ResponseEntity.ok(patientService.getBloodGroupCount());
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<List<Appointment>> getAppointmentsByPatient(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getAppointmentsByPatient(id));
    }
}
