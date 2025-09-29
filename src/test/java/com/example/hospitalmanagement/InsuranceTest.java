package com.example.hospitalmanagement;

import com.example.hospitalmanagement.entity.Insurance;
import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.service.InsuranceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
public class InsuranceTest {

    @Autowired
    private InsuranceService insuranceService;

    @Test
    public void TestInsurance(){
        Insurance insurance = Insurance.builder()
                .policyNumber("HC123456")
                .provider("HealthCare Inc.")
                .validUntil(LocalDate.of(2030,12,31))
                .build();

        Patient patient = insuranceService.assignInsuranceToPatient(insurance, 1l);
        System.out.println(patient);
    }
}
