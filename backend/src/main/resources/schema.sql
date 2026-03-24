-- Drop existing tables to clear all data
DROP TABLE IF EXISTS practitioner_profile;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    _id INT PRIMARY KEY AUTO_INCREMENT,
    _name VARCHAR(100) NOT NULL,
    _email VARCHAR(150) NOT NULL UNIQUE,
    _password VARCHAR(255) NOT NULL,
    _role ENUM('patient', 'practitioner', 'admin') NOT NULL,
    _bio TEXT NULL,
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
    FOREIGN KEY (user_id) REFERENCES users(_id) ON DELETE CASCADE,
    INDEX (license_number)
);

-- (seed data kept in data.sql)
