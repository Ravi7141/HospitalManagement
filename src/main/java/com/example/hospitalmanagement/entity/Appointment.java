package com.example.hospitalmanagement.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Column(length = 500)
    private String reason;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "patient_id",nullable = false)
    @JsonBackReference("patient-appointments")
    private Patient patient;

    @ManyToOne(fetch =  FetchType.LAZY)
    @JoinColumn(nullable = false)
    @JsonBackReference
    private Doctor doctor;

}
