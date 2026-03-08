-- Drop existing tables to clear all data
DROP TABLE IF EXISTS therapy_session;
DROP TABLE IF EXISTS practitioner_available_slots;
DROP TABLE IF EXISTS practitioner_profile;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('patient', 'practitioner', 'admin') NOT NULL,
    bio TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE practitioner_profile (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL UNIQUE,
    license_number VARCHAR(50) NOT NULL,
    specialization VARCHAR(50) NOT NULL,
    verification_status ENUM('PENDING','VERIFIED','REJECTED') DEFAULT 'PENDING',
    rating DECIMAL(2,1) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX (license_number)
);

CREATE TABLE practitioner_available_slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    practitioner_id INT NOT NULL,
    available_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status ENUM('AVAILABLE', 'BOOKED', 'CANCELLED') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (practitioner_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (practitioner_id, available_date, start_time)
);

CREATE TABLE therapy_session (
    id INT PRIMARY KEY AUTO_INCREMENT,
    practitioner_id INT NOT NULL,
    user_id INT NOT NULL,
    date DATETIME NOT NULL,
    status ENUM('booked', 'completed', 'cancelled') NOT NULL DEFAULT 'booked',
    notes TEXT,
    calendar_added TINYINT(1) NOT NULL DEFAULT 0,
    reminder_sent TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (practitioner_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed Data for Testing
DELETE FROM users;
INSERT INTO users (id, name, email, password, role) VALUES 
(1, 'Test Practitioner', 'practitioner@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOnu', 'practitioner'),
(2, 'Test Patient', 'patient@example.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.TVuHOnu', 'patient');

INSERT INTO practitioner_profile (user_id, license_number, specialization, verification_status, rating) VALUES 
(1, '1234567890', 'Ayurveda Specialist', 'VERIFIED', 4.8);

INSERT INTO practitioner_available_slots (practitioner_id, available_date, start_time, end_time, status) VALUES 
(1, CURDATE(), '09:00:00', '10:00:00', 'AVAILABLE'),
(1, CURDATE(), '10:00:00', '11:00:00', 'AVAILABLE'),
(1, DATE_ADD(CURDATE(), INTERVAL 1 DAY), '14:00:00', '15:00:00', 'AVAILABLE');

