package com.example.demo.controller;

import com.example.demo.dto.PractitionerProfileResponse;
import com.example.demo.model.PractitionerProfile;
import com.example.demo.model.User;
import com.example.demo.model.VerificationStatus;
import com.example.demo.repository.PractitionerProfileRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/practitioner")
public class PractitionerController {

    @Autowired
    PractitionerProfileRepository practitionerProfileRepository;

    @Autowired
    UserRepository userRepository;

    private PractitionerProfileResponse toDto(PractitionerProfile p) {
        User u = p.getUser();
        return new PractitionerProfileResponse(
                p.getId(),
                u != null ? u.getId() : null,
                u != null ? u.getName() : null,
                u != null ? u.getEmail() : null,
                p.getLicenseNumber(),
                p.getSpecialization(),
                p.getVerificationStatus(),
                p.getRating()
        );
    }

    @PostMapping("/profile")
    public ResponseEntity<?> createOrUpdateProfile(@RequestBody PractitionerProfileRequest req) {
        User user = getAuthenticatedUser();
        if (req.getUserId() != null && !req.getUserId().equals(user.getId())) {
            return ResponseEntity.status(403).body("userId does not match the authenticated user");
        }

        PractitionerProfile profile = practitionerProfileRepository.findByUser(user).orElse(new PractitionerProfile());
        profile.setUser(user);
        profile.setLicenseNumber(req.getLicenseNumber());
        profile.setSpecialization(req.getSpecialization());
        if (profile.getVerificationStatus() == null) profile.setVerificationStatus(VerificationStatus.PENDING);
        practitionerProfileRepository.save(profile);
        return ResponseEntity.status(201).body(toDto(profile));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        PractitionerProfile p = practitionerProfileRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(toDto(p));
    }

    @GetMapping("/verified")
    public ResponseEntity<?> getVerified() {
        List<PractitionerProfile> list = practitionerProfileRepository.findAll()
                .stream()
                .filter(p -> p.getVerificationStatus() == VerificationStatus.VERIFIED)
                .collect(Collectors.toList());

        return ResponseEntity.ok(list.stream().map(this::toDto).collect(Collectors.toList()));
    }

    @PutMapping("/{id}/verify")
    public ResponseEntity<?> setVerificationStatus(@PathVariable Long id, @RequestParam("status") VerificationStatus status) {
        PractitionerProfile p = practitionerProfileRepository.findById(id).orElseThrow();
        p.setVerificationStatus(status);
        practitionerProfileRepository.save(p);
        return ResponseEntity.ok(toDto(p));
    }

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email).orElseThrow();
    }
}
