package com.example.demo.service;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        // Prefer showing practitioner-owned products (new catalog).
        // Legacy seed products (without practitioner_id) may still exist in DB,
        // especially when orders exist and we avoid destructive reseeds.
        List<Product> products;
        if (productRepository.countByPractitionerIdIsNotNull() > 0) {
            products = productRepository.findByPractitionerIdIsNotNull();
        } else {
            products = productRepository.findAll();
        }

        // Ayurveda-related products are not part of this application.
        return products.stream()
                .filter(p -> !isAyurvedaProduct(p))
                .toList();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    private static boolean isAyurvedaProduct(Product product) {
        if (product == null) return false;
        return isAyurvedaText(product.getCategory()) || isAyurvedaText(product.getName());
    }

    private static boolean isAyurvedaText(String text) {
        if (text == null) return false;
        return text.toLowerCase().contains("ayur");
    }

}
