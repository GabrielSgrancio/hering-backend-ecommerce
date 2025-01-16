package com.example.heringorder.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.heringorder.models.Order;
import com.example.heringorder.services.OrderService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }


  @PostMapping
  public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> payload) {
    try {
      Long userId = Long.valueOf(payload.get("userId").toString());
      Double totalAmount = Double.valueOf(payload.get("totalAmount").toString());

      Order order = orderService.createOrder(userId, totalAmount);
      return ResponseEntity.ok(order);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Erro ao criar pedido: " + e.getMessage());
    }
  }


  @GetMapping
  public ResponseEntity<List<Order>> getAllOrders() {
    List<Order> orders = orderService.getAllOrders();
    return ResponseEntity.ok(orders);
  }


  @GetMapping("/{id}")
  public ResponseEntity<?> getOrderById(@PathVariable Long id) {
    Order order = orderService.getOrderById(id);
    if (order == null) {
      return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(order);
  }
}
