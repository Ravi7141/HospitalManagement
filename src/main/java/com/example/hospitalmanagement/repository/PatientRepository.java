package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.dto.BloodGroupCountResponseEntity;
import com.example.hospitalmanagement.entity.Patient;
import com.example.hospitalmanagement.entity.type.BloodGroupType;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public interface PatientRepository extends JpaRepository<Patient,Long> {
    Patient getPatientByName(String name);
    List<Patient> findByNameContainingOrderByIdDesc(String name);

    @Query("SELECT p FROM Patient p WHERE p.bloodGroup = :bloodGroup")
    List<Patient> findByBloodGroup(@Param("bloodGroup") BloodGroupType bloodGroup);

    @Query("SELECT p FROM Patient p WHERE p.birthDate > :birthDate")
    List<Patient> findByBornAfterDate(@Param("birthDate") LocalDate birthDate);

    @Query("SELECT p.bloodGroup, COUNT(p) FROM Patient p WHERE p.bloodGroup = :bloodGroup GROUP BY p.bloodGroup")
    List<Object[]> countEachBloodGroupType(@Param("bloodGroup") BloodGroupType bloodGroup);

//    @Query("SELECT p.bloodGroup, COUNT(p) FROM Patient p GROUP BY p.bloodGroup")
//    List<Object[]> countEachBloodGroupType();

    @Query("SELECT new com.example.hospitalmanagement.dto.BloodGroupCountResponseEntity(p.bloodGroup, COUNT(p)) " +
            "FROM Patient p GROUP BY p.bloodGroup")
    List<BloodGroupCountResponseEntity> countEachBloodGroupType();

    @Query(value = "SELECT p FROM Patient p")
    Page<Patient> findAllPatients(Pageable pageable);

    @Transactional
    @Modifying // Update/Delete queries must be annotated with @Modifying, otherwise an InvalidDataAccessApiUsageException will be thrown.
    @Query("UPDATE Patient p SET p.name = :name WHERE p.id = :id")
    int updateNameById(@Param("name") String name , @Param("id") Long id);

    @Query("SELECT p from Patient p LEFT JOIN FETCH p.appointments a left join fetch a.doctor")
//    @Query("SELECT p from Patient p LEFT JOIN FETCH p.appointments")
    List<Patient> findAllPatientWithAppointments();
}
