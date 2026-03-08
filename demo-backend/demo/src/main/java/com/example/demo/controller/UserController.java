
package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.entity.Order;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.service.TherapySessionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    TherapySessionService sessionService;

    @Autowired
    OrderRepository orderRepository;

    @GetMapping("/dashboard")
    public ResponseEntity<?> dashboard(@RequestParam(value = "email", required = false) String email) {

        User user = resolveAuthenticatedUser(email);
        if (user == null) {
            return ResponseEntity.status(403).body("email does not match authenticated user");
        }

        Map<String, Object> resp = new HashMap<>();

        // User profile
        resp.put("userProfile", user);

        // Therapy sessions
        resp.put("sessionHistory", sessionService.getSessionsForUser(user));

        // Product orders
        List<Order> orders = orderRepository.findByUserId(user.getId());
        resp.put("productOrders", orders);

        return ResponseEntity.ok(resp);
    }

    private User resolveAuthenticatedUser(String email) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String authEmail = authentication.getName();

        if (email != null && !email.isBlank() && !email.equalsIgnoreCase(authEmail)) {
            return null;
        }

        return userRepository.findByEmail(authEmail).orElseThrow();
    }
}


