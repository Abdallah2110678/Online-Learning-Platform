package com.example.aswe.demo.repository;

import com.example.aswe.demo.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository <Student,Long>{
    boolean existsByEmail(String email);
}
