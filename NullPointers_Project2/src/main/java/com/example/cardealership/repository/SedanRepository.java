package com.example.cardealership.repository;

import com.example.cardealership.model.Sedan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SedanRepository extends JpaRepository<Sedan, Long> {
}