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
public class SUV extends Car implements Discountable {
    private double weight;
    
    public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	@Override
    public double getDiscountRate() {
        return weight > 2000 ? 0.10 : 0.20;
    }
    
    @Override
    public double getSalePrice() {
        return super.getSalePrice() * (1 - getDiscountRate());
    }
}
