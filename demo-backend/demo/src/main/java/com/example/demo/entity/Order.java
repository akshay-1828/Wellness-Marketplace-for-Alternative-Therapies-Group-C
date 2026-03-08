package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id")
    private Long userId;

    @Column(name="product_name")
    private String productName;

    private int quantity;

    @Column(name="total_amount")
    private double totalAmount;

    @Column(name="order_date")
    private LocalDateTime orderDate;

    private String status;

    public Order() {}

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public String getProductName() { return productName; }
    public int getQuantity() { return quantity; }
    public double getTotalAmount() { return totalAmount; }
    public LocalDateTime getOrderDate() { return orderDate; }
    public String getStatus() { return status; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setProductName(String productName) { this.productName = productName; }
    public void setQuantity(int quantity) { this.quantity = quantity; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
    public void setOrderDate(LocalDateTime orderDate) { this.orderDate = orderDate; }
    public void setStatus(String status) { this.status = status; }
}