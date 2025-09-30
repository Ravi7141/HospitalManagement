package com.example.hospitalmanagement;


import com.example.hospitalmanagement.dto.BloodGroupCountResponseEntity;
import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.repository.PatientRepository;
import com.example.hospitalmanagement.service.PatientService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import javax.naming.ldap.PagedResultsControl;
import java.time.LocalDate;
import java.util.List;

@SpringBootTest
public class PatientTests {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private PatientService patientService;

    @Test
    public void testPatientRepository(){
        List<Patient> patients = patientRepository.findAllPatientWithAppointments();
        System.out.println(patients);
    }

    @Test
    public void testTransactionMethod(){
//        Patient patient = patientService.getPatientById(1L);
//        Patient patient = patientRepository.getPatientByName("Bob Smith");
//        List<Patient> patient2 = patientService.findByNameContainingOrderByIdDesc("Bob");
//        List<Patient> patient3 = patientRepository.findByBornAfterDate(LocalDate.of(1988,05,12));

//        List<Object[]> bloodGroupList = patientRepository.countEachBloodGroupType();
//        List<BloodGroupCountResponseEntity> bloodGroupCountResponseEntities = patientRepository.countEachBloodGroupType();
//        for(BloodGroupCountResponseEntity bg : bloodGroupCountResponseEntities){
//            System.out.println(bg);
//        }
//        for(Object[] bg : bloodGroupList){
//            System.out.println(bg[0] + " : " + bg[1]);
//        }

//        int rows = patientRepository.updateNameById("Robert Smith", 2L);
//        System.out.println("Rows updated: " + rows);

        Page<Patient> patients = patientRepository.findAllPatients(PageRequest.of(0, 1));

        for (Patient patient : patients){
            System.out.println(patient);
        }

//        System.out.println(patients);

    }
}
