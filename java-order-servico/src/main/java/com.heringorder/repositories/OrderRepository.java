package com.example.heringorder.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.heringorder.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
  
}
