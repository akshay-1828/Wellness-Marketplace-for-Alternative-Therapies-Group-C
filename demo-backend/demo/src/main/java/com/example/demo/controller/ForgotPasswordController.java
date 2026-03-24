package com.example.demo.controller;

import com.example.demo.service.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        forgotPasswordService.processForgotPassword(email);

        return ResponseEntity.ok("If the email exists, a reset link has been sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {

        String token = request.get("token");
        String newPassword = request.get("newPassword");

        boolean success = forgotPasswordService.resetPassword(token, newPassword);

        if (!success) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        return ResponseEntity.ok("Password reset successful.");

    }
}