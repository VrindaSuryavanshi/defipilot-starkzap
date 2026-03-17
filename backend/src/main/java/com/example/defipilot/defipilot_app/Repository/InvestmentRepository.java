package com.example.defipilot.defipilot_app.Repository;

import com.example.defipilot.defipilot_app.Entity.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentRepository extends JpaRepository<Investment,Integer> {
}