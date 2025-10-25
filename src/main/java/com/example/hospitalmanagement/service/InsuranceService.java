package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.entity.Insurance;
import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.repository.InsuranceRepository;
import com.example.hospitalmanagement.repository.PatientRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InsuranceService {

    private final InsuranceRepository insuranceRepository;
    private final PatientRepository patientRepository;

    @Transactional
    public Patient assignInsuranceToPatient(Insurance insurance, Long patientId){
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient with ID " + patientId + " not found"));
        patient.setInsurance(insurance);
        insurance.setPatient(patient);
        return patient;
    }

    @Transactional
    public Patient disassociateInsuranceFromPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new EntityNotFoundException("Patient with ID " + patientId + " not found"));
        patient.setInsurance(null);
        return patient;
    }

    public List<Insurance> getAllInsurance() {
        return insuranceRepository.findAll();
    }

    public Insurance getInsuranceById(Long id) {
        return insuranceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insurance not found with id: " + id));
    }

    public Insurance saveInsurance(Long patientId, Insurance insurance) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        patient.setInsurance(insurance);
        insurance.setPatient(patient);
        patientRepository.save(patient); // cascade saves insurance
        return insurance; // saved via cascade
    }


    @Transactional
    public Insurance updateInsurance(Long id, Insurance insuranceDetails) {
        Insurance insurance = getInsuranceById(id); // throws exception if not found

        insurance.setPolicyNumber(insuranceDetails.getPolicyNumber());
        insurance.setProvider(insuranceDetails.getProvider());
        insurance.setValidUntil(insuranceDetails.getValidUntil());

        return insurance; // saved automatically at transaction commit and dirty checking
    }

    public void deleteInsurance(Long id) {
        Insurance insurance = insuranceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Insurance not found"));

        Patient patient = insurance.getPatient();
        if (patient != null) {
            patient.setInsurance(null);
        }

        insuranceRepository.delete(insurance);
    }

    public List<Insurance> getByProvider(String name) {
        return insuranceRepository.findByProvider(name);
    }

    public Insurance getInsuranceByPatient(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + patientId));

        Insurance insurance = patient.getInsurance(); // one-to-one
        if (insurance == null) {
            throw new RuntimeException("No insurance found for patient id: " + patientId);
        }

        return insurance;
    }
}
