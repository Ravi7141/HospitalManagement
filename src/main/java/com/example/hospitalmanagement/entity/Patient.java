package com.example.hospitalmanagement.entity;

import com.example.hospitalmanagement.entity.type.BloodGroupType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@ToString
@Getter
@Setter
@Table(
        uniqueConstraints = {
                @UniqueConstraint(name = "patient_email_unique", columnNames = "email"),
                @UniqueConstraint(name = "patient_name_birthDate_unique", columnNames = {"name", "birthDate"})
        },
        indexes = {
                @Index(name = "idx_patient_email", columnList = "email")
        }
)
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50)
    private String name;

//    @ToString.Exclude
    private LocalDate birthDate;

    @Column(unique = true, nullable = false)
    private String email;
    private String gender;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private BloodGroupType bloodGroup;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "patient_incurance_id") // owning side of the relationship
    private Insurance insurance;

    @OneToMany(mappedBy = "patient")
    @ToString.Exclude
    private List<Appointment> appointments = new ArrayList<>();


}
