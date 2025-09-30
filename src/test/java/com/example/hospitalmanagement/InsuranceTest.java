package com.example.hospitalmanagement;

import com.example.hospitalmanagement.entity.Appointment;
import com.example.hospitalmanagement.entity.Insurance;
import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.repository.AppointmentRepository;
import com.example.hospitalmanagement.service.AppointmentService;
import com.example.hospitalmanagement.service.InsuranceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.time.LocalDateTime;

@SpringBootTest
public class InsuranceTest {

    @Autowired
    private InsuranceService insuranceService;

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Test
    public void TestInsurance(){
        Insurance insurance = Insurance.builder()
                .policyNumber("HC1234256")
                .provider("HealthCare ninja Inc.")
                .validUntil(LocalDate.of(2030,12,31))
                .build();

        Patient patient = insuranceService.assignInsuranceToPatient(insurance, 2l);
        System.out.println(patient);
        Patient patient1 = insuranceService.disassociateInsuranceFromPatient(1l);
        System.out.println(patient1);
    }

    @Test
    public void tesCreateAppointment(){
        Appointment appointment = Appointment.builder()
                .appointmentTime(LocalDateTime.of(2025,11,1,14,31))
                .reason("Regular Checkup")
                .build();
        Appointment savedAppointment = appointmentService.createAppointment(appointment,1l,1l);
        System.out.println(savedAppointment);

        Appointment appointment1 = appointmentService.reAssignAppoitmentToAnotherDoctor(savedAppointment.getId(), 3l);
        System.out.println(appointment1);
    }
}
