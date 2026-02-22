package com.example.demo.controller;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.PractitionerLicenseLookupResponse;
import com.example.demo.dto.RefreshTokenRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register/user")
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest req) {
        AuthResponse response = authService.registerUser(req);
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/register/practitioner")
    public ResponseEntity<AuthResponse> registerPractitioner(@Valid @RequestBody RegisterRequest req) {
        AuthResponse response = authService.registerPractitioner(req);
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(@Valid @RequestBody RefreshTokenRequest req) {
        return ResponseEntity.ok(authService.refreshToken(req));
    }

    @GetMapping("/license/{licenseNumber}")
    public ResponseEntity<PractitionerLicenseLookupResponse> getPractitionerByLicense(
            @PathVariable String licenseNumber) {
        return ResponseEntity.ok(authService.getPractitionerByLicense(licenseNumber));
    }
}
