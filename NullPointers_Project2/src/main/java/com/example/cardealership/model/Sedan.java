package com.example.cardealership.model;

import com.example.cardealership.interfaces.Discountable;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Sedan extends Car implements Discountable {
    private int year;
    private double manufacturerDiscount;
    
    @Override
    public double getDiscountRate() {
        return manufacturerDiscount / super.getSalePrice();
    }
    
    @Override
    public double getSalePrice() {
        return super.getSalePrice() - manufacturerDiscount;
    }
}