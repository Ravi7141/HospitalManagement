package com.example.hospitalmanagement.controller;

import com.example.hospitalmanagement.entity.Department;
import com.example.hospitalmanagement.entity.Doctor;
import com.example.hospitalmanagement.service.DepartmentService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @GetMapping
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Department dept = departmentService.getDepartmentById(id);
        return (dept != null) ? ResponseEntity.ok(dept) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.status(HttpStatus.CREATED).body(departmentService.saveDepartment(department));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartment(@PathVariable Long id, @RequestBody Department department) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, department));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartment(@PathVariable Long id) {
        departmentService.deleteDepartment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/doctors")
    public ResponseEntity<List<Doctor>> getDoctorsByDepartment(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getDoctorsByDepartment(id));
    }

    @GetMapping("/{id}/head-doctor")
    public ResponseEntity<Doctor> getHeadDoctor(@PathVariable Long id) {
        return ResponseEntity.ok(departmentService.getHeadDoctor(id));
    }
}
