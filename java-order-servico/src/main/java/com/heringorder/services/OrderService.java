package com.heringorder.services;

import org.springframework.stereotype.Service;
import com.heringorder.models.Order;
import com.heringorder.repositories.OrderRepository;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepo;

    public OrderService(OrderRepository orderRepo) {
        this.orderRepo = orderRepo;
    }

    public Order createOrder(Long userId, Double totalAmount) {
        // total < 100 => APPROVED, senão PENDING
        Order order = new Order();
        order.setUserId(userId);
        order.setTotalAmount(totalAmount);
        order.setStatus(totalAmount < 100 ? "APPROVED" : "PENDING");
        return orderRepo.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepo.findById(id).orElse(null);
    }
}
