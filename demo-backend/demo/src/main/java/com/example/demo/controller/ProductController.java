package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import com.example.demo.service.ProductCatalogService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    private final ProductCatalogService productCatalogService;

    public ProductController(ProductService productService, ProductCatalogService productCatalogService) {
        this.productService = productService;
        this.productCatalogService = productCatalogService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        Product product = productService.getProductById(productId);

        if (product == null) {
            return ResponseEntity.status(404).body("Product not found with id: " + productId);
        }

        return ResponseEntity.ok(product);
    }

    @PostMapping("/auto-assign-sellers")
    public ResponseEntity<?> autoAssignSellers() {
        String msg = productCatalogService.reseedCatalogFromPractitionerSpecializations(true);
        return ResponseEntity.ok(msg);
    }
}


