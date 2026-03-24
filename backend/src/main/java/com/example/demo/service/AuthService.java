package com.example.demo.service;

import com.example.demo.dto.AuthResponse;
import com.example.demo.dto.NpiPractitionerDetails;
import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.PractitionerLicenseLookupResponse;
import com.example.demo.dto.RefreshTokenRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.model.PractitionerProfile;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.model.VerificationStatus;
import com.example.demo.repository.PractitionerProfileRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final PractitionerProfileRepository practitionerProfileRepository;
    private final NpiVerificationService npiVerificationService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    public AuthService(UserRepository userRepository,
                       PractitionerProfileRepository practitionerProfileRepository,
                       NpiVerificationService npiVerificationService,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil,
                       AuthenticationManager authenticationManager,
                       UserDetailsService userDetailsService) {
        this.userRepository = userRepository;
        this.practitionerProfileRepository = practitionerProfileRepository;
        this.npiVerificationService = npiVerificationService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }

    @Transactional
    public AuthResponse registerUser(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "email already registered");
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.PATIENT);
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        return AuthResponse.builder()
                .accessToken(jwtUtil.generateAccessToken(userDetails))
                .refreshToken(jwtUtil.generateRefreshToken(userDetails))
                .role(user.getRole())
                .message("user registered")
                .build();
    }

    @Transactional
    public AuthResponse registerPractitioner(RegisterRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "email already registered");
        }

        if (req.getLicenseNumber() == null || req.getLicenseNumber().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "License number is required for practitioner registration");
        }

        // ── Verify license via NPI Registry API ──
        log.info("Verifying practitioner NPI: {}", req.getLicenseNumber());
        NpiPractitionerDetails details = npiVerificationService
                .lookupByNpi(req.getLicenseNumber());

        // Auto-detect specialization from NPI taxonomy if not provided
        String specialization = req.getSpecialization();
        if (specialization == null || specialization.isBlank()) {
            specialization = details.getPrimaryTaxonomy();
        }

        log.info("NPI verified: {} — {} ({})", details.getPractitionerName(),
                details.getPrimaryTaxonomy(), details.getEnumerationType());

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.PRACTITIONER);
        userRepository.save(user);

        PractitionerProfile profile = new PractitionerProfile();
        profile.setUser(user);
        profile.setLicenseNumber(req.getLicenseNumber());
        profile.setSpecialization(specialization);
        profile.setVerificationStatus(VerificationStatus.VERIFIED);
        practitionerProfileRepository.save(profile);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
        return AuthResponse.builder()
                .accessToken(jwtUtil.generateAccessToken(userDetails))
                .refreshToken(jwtUtil.generateRefreshToken(userDetails))
                .role(user.getRole())
            .message("practitioner registered — license verified (" + specialization + ")")
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

            return AuthResponse.builder()
                    .accessToken(jwtUtil.generateAccessToken(userDetails))
                    .refreshToken(jwtUtil.generateRefreshToken(userDetails))
                    .role(user.getRole())
                    .message("login successful")
                    .build();
        } catch (BadCredentialsException ex) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid email or password");
        }
    }

    public AuthResponse refreshToken(RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();
        if (jwtUtil.isTokenExpired(refreshToken)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "refresh token expired");
        }

        String userEmail = jwtUtil.extractUsername(refreshToken);
        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
        if (!jwtUtil.isTokenValid(refreshToken, userDetails)) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "invalid refresh token");
        }

        User user = userRepository.findByEmail(userEmail).orElseThrow();

        return AuthResponse.builder()
                .accessToken(jwtUtil.generateAccessToken(userDetails))
                .refreshToken(jwtUtil.generateRefreshToken(userDetails))
                .role(user.getRole())
                .message("token refreshed")
                .build();
    }

    public PractitionerLicenseLookupResponse getPractitionerByLicense(String licenseNumber) {
        if (licenseNumber == null || licenseNumber.isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "license number is required");
        }
        NpiPractitionerDetails details = npiVerificationService
            .lookupByNpi(licenseNumber);
        return new PractitionerLicenseLookupResponse(
                details.getPractitionerName(),
                details.getEmail(),
                details.getPrimaryTaxonomy(),
                "NPI Registry",
                "VERIFIED"
        );
    }
}
