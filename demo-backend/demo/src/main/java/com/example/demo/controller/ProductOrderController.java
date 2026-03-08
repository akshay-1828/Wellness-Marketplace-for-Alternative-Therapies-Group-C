package com.example.demo.controller;

import com.example.demo.entity.ProductOrder;
import com.example.demo.service.ProductOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class ProductOrderController {

    private final ProductOrderService orderService;

    public ProductOrderController(ProductOrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ProductOrder createOrder(@RequestBody ProductOrder order) {
        return orderService.createOrder(order);
    }

    @GetMapping
    public List<ProductOrder> getOrders() {
        return orderService.getAllOrders();
    }
}