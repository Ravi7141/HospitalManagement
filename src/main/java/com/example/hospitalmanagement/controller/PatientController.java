package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/patients")
@RestController
public class PatientController {

    @Autowired
    private PatientService patientService;

    public Patient getPatientById(Long id) {
        return patientService.getPatientById(id);
    }
}
