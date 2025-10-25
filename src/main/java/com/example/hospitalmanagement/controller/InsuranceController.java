package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.entity.Insurance;
import com.example.hospitalmanagement.service.InsuranceService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/insurance")
public class InsuranceController {

    private final InsuranceService insuranceService;

    public InsuranceController(InsuranceService insuranceService) {
        this.insuranceService = insuranceService;
    }

    @GetMapping
    public ResponseEntity<List<Insurance>> getAllInsurance() {
        return ResponseEntity.ok(insuranceService.getAllInsurance());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Insurance> getInsuranceById(@PathVariable Long id) {
        Insurance ins = insuranceService.getInsuranceById(id);
        return (ins != null) ? ResponseEntity.ok(ins) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{patientId}")
    public ResponseEntity<Insurance> createInsuranceForPatient(@PathVariable Long patientId, @RequestBody Insurance insurance) {
        return ResponseEntity.status(HttpStatus.CREATED).body(insuranceService.saveInsurance(patientId,insurance));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Insurance> updateInsurance(@PathVariable Long id, @RequestBody Insurance insurance) {
        return ResponseEntity.ok(insuranceService.updateInsurance(id, insurance));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInsurance(@PathVariable Long id) {
        insuranceService.deleteInsurance(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/provider/{name}")
    public ResponseEntity<List<Insurance>> getByProvider(@PathVariable String name) {
        return ResponseEntity.ok(insuranceService.getByProvider(name));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<Insurance> getInsuranceByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(insuranceService.getInsuranceByPatient(patientId));
    }
}
