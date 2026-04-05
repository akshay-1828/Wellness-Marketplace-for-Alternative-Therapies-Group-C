package com.example.demo.service;

import com.example.demo.repository.UserRepository;
import com.example.demo.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    // Generate secure random token
    private String generateSecureToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[32];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

    // Forgot Password Logic
    public void processForgotPassword(String email) {

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return; // Do not reveal if user exists
        }

        User user = optionalUser.get();

        String rawToken = generateSecureToken();
        String hashedToken = passwordEncoder.encode(rawToken);

        user.setResetTokenHash(hashedToken);
        user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));

        userRepository.save(user);

        // Create reset link
        String resetLink = "http://localhost:3000/reset-password?token=" + rawToken;

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
        message.setText("Click the link below to reset your password:\n\n" + resetLink);

        mailSender.send(message);

        System.out.println("MAIL SENT SUCCESSFULLY");
    }

    // Reset Password Logic
    public boolean resetPassword(String token, String newPassword) {

        Optional<User> optionalUser = userRepository.findAll()
                .stream()
                .filter(user -> user.getResetTokenHash() != null)
                .filter(user -> passwordEncoder.matches(token, user.getResetTokenHash()))
                .findFirst();

        if (optionalUser.isEmpty()) {
            return false;
        }

        User user = optionalUser.get();

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            return false;
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetTokenHash(null);
        user.setResetTokenExpiry(null);

        userRepository.save(user);

        return true;
    }
}