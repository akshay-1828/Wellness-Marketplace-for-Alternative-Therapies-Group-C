package com.example.demo.service;

import com.example.demo.entity.ProductOrder;
import com.example.demo.repository.ProductOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductOrderService {

    private final ProductOrderRepository repository;

    public ProductOrderService(ProductOrderRepository repository) {
        this.repository = repository;
    }

    public ProductOrder createOrder(ProductOrder order) {
        return repository.save(order);
    }

    public List<ProductOrder> getAllOrders() {
        return repository.findAll();
    }
}