package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    @Transactional
    public Patient getPatientById(Long id) {

        Patient p1 = patientRepository.findById(id).orElseThrow();
        Patient p2 = patientRepository.findById(id).orElseThrow();
        System.out.println(p1 == p2); // true, because of the first-level cache and transactional context ,save in the same session
        p1.setName("raju"); // no need to call save method, because of the transactional context and first-level cache
        // it checks the entity state and if it is changed, it will automatically update the database when the transaction is committed
        return p1;
    }
    public List<Patient> findByNameContainingOrderByIdDesc(String name){
        return patientRepository.findByNameContainingOrderByIdDesc(name);
    }
}
