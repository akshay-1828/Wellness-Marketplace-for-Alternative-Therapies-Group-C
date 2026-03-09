package com.example.demo.repository;

import com.example.demo.model.PractitionerProfile;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PractitionerProfileRepository extends JpaRepository<PractitionerProfile, Long> {
    Optional<PractitionerProfile> findByUser(User user);
}
