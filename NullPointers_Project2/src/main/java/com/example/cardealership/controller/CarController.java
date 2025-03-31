package com.example.cardealership.controller;

import com.example.cardealership.model.SUV;
import com.example.cardealership.model.Sedan;
import com.example.cardealership.repository.SUVRepository;
import com.example.cardealership.repository.SedanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")

@RequestMapping("/api/cars")

public class CarController {
    
    @Autowired
    private SUVRepository suvRepository;
    
    @Autowired
    private SedanRepository sedanRepository;
    
    @GetMapping("/suvs")
    public List<SUV> getAllSUVs() {
        return suvRepository.findAll();
    }
    
    @GetMapping("/sedans")
    public List<Sedan> getAllSedans() {
        return sedanRepository.findAll();
    }
    
    @PostMapping("/suvs")
    public SUV createSUV(@RequestBody SUV suv) {
        return suvRepository.save(suv);
    }
    
    @PostMapping("/sedans")
    public Sedan createSedan(@RequestBody Sedan sedan) {
        return sedanRepository.save(sedan);
    }
}