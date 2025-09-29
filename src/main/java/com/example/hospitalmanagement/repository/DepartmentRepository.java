package com.example.hospitalmanagement.repository;

import com.example.hospitalmanagement.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DepartmentRepository extends JpaRepository<Department, Long> {
}