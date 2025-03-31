package com.example.cardealership;

import com.example.cardealership.model.SUV;
import com.example.cardealership.model.Sedan;
import com.example.cardealership.repository.SUVRepository;
import com.example.cardealership.repository.SedanRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CarDealershipApplication {

    public static void main(String[] args) {

        SpringApplication.run(CarDealershipApplication.class, args);
    }
    
    @Bean
    public CommandLineRunner demo(SedanRepository sedanRepository, SUVRepository suvRepository) {
        return (args) -> {
            // Create two Sedan instances
            Sedan sedan1 = new Sedan();
            sedan1.setName("BMW");
            sedan1.setSpeed(180);
            sedan1.setRegularPrice(25000);
            sedan1.setColor("Red");
            sedan1.setYear(2023);
            sedan1.setManufacturerDiscount(2000);
            sedanRepository.save(sedan1);

            Sedan sedan2 = new Sedan();
            sedan2.setName("Audi");
            sedan2.setSpeed(200);
            sedan2.setRegularPrice(35000);
            sedan2.setColor("Blue");
            sedan2.setYear(2023);
            sedan2.setManufacturerDiscount(3000);
            sedanRepository.save(sedan2);

            // Create SUV instance
            SUV suv = new SUV();
            suv.setName("Toyota");
            suv.setSpeed(160);
            suv.setRegularPrice(40000);
            suv.setColor("Black");
            suv.setWeight(2500);
            suvRepository.save(suv);

            // Display sale prices
            System.out.println("Sedan 1 Sale Price: $" + sedan1.getSalePrice());
            System.out.println("Sedan 2 Sale Price: $" + sedan2.getSalePrice());
            System.out.println("SUV Sale Price: $" + suv.getSalePrice());
        };
    }
}