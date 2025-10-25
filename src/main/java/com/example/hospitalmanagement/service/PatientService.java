package com.example.hospitalmanagement.service;

import com.example.hospitalmanagement.dto.BloodGroupCountResponseEntity;
import com.example.hospitalmanagement.entity.Appointment;
import com.example.hospitalmanagement.entity.Insurance;
import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.entity.type.BloodGroupType;
import com.example.hospitalmanagement.repository.AppointmentRepository;
import com.example.hospitalmanagement.repository.InsuranceRepository;
import com.example.hospitalmanagement.repository.PatientRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final InsuranceRepository insuranceRepository;
    private final AppointmentRepository appointmentRepository;

    @Transactional
    public Patient getPatientById(Long id) {

        Patient p1 = patientRepository.findById(id).orElseThrow();
        Patient p2 = patientRepository.findById(id).orElseThrow();
//        System.out.println(p1 == p2);
        // true, because of the first-level cache and transactional context ,save in the same session
//        p1.setName("raju");
        // no need to call save method, because of the transactional context and first-level cache
        // it checks the entity state and if it is changed, it will automatically update the database when the transaction is committed
        return p1;
    }
    public List<Patient> findByNameContainingOrderByIdDesc(String name){
        return patientRepository.findByNameContainingOrderByIdDesc(name);
    }

    public List<Patient> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();
        return patients;
    }

    public Patient savePatient(Patient patient) {
        for (Appointment appointment : patient.getAppointments()) {
            appointment.setPatient(patient);
        }
        Patient save = patientRepository.save(patient);
        return save;
    }

    @Transactional
    public Patient updatePatient(Long id, Patient patient) {
        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        existingPatient.setName(patient.getName());
        existingPatient.setBirthDate(patient.getBirthDate());
        existingPatient.setEmail(patient.getEmail());
        existingPatient.setGender(patient.getGender());
        existingPatient.setBloodGroup(patient.getBloodGroup());

        if (patient.getInsurance() != null) {
            patient.getInsurance().setPatient(existingPatient);
            existingPatient.setInsurance(patient.getInsurance());
        }

        return existingPatient;
    }



    public void deletePatient(Long id) {
        // Check if patient exists
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        // Delete the patient (insurance will be deleted automatically)
        patientRepository.delete(patient);
    }

    public List<Patient> getPatientsByBloodGroup(String group) {
        BloodGroupType bloodGroup;
        try {
            bloodGroup = BloodGroupType.valueOf(group.toUpperCase()); // Convert string to enum
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid blood group: " + group);
        }
        return patientRepository.findByBloodGroup(bloodGroup);
    }

    public List<BloodGroupCountResponseEntity> getBloodGroupCount() {
        return patientRepository.countEachBloodGroupType();
    }

    public List<Appointment> getAppointmentsByPatient(Long id) {
        return appointmentRepository.findByPatientId(id);
    }
}
