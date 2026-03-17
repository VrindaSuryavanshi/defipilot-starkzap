package com.example.defipilot.defipilot_app.Controller;

import com.example.defipilot.defipilot_app.Entity.Investment;
import com.example.defipilot.defipilot_app.Repository.InvestmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/investments")
@CrossOrigin(origins = "http://localhost:3000")
public class InvestmentController {

    @Autowired
    InvestmentRepository repo;

    @GetMapping
    public List<Investment> getAllInvestments(){
        return repo.findAll();
    }

    @PostMapping
    public Investment saveInvestment(@RequestBody Investment investment){
        return repo.save(investment);
    }

    @DeleteMapping("/{id}")
    public void deleteInvestment(@PathVariable int id){
        repo.deleteById(id);
    }
}