-- MySQL Schema for Team-Appointee Application

CREATE DATABASE IF NOT EXISTS `appointee_db`;
USE `appointee_db`;

-- 1. Users Table (Authentication & User Details)
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `fullname` VARCHAR(255) NOT NULL,
  `verified_number` VARCHAR(20) NOT NULL UNIQUE,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Appointments Selection Table
CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_phone` VARCHAR(20),
  `state` VARCHAR(100) NOT NULL DEFAULT 'maharashtra',
  `district` VARCHAR(100) NOT NULL DEFAULT 'navi_mumbai',
  `sub_district` VARCHAR(100) NOT NULL,
  `specialization` VARCHAR(100) NOT NULL,
  `hospital` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Patient Form Submissions Table
CREATE TABLE IF NOT EXISTS `patient_forms` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `date_of_birth` VARCHAR(100) NOT NULL,
  `gender` VARCHAR(50) NOT NULL,
  `phone_no` VARCHAR(20) NOT NULL,
  `address` TEXT NOT NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NOT NULL,
  `appointment_date` VARCHAR(100) NOT NULL,
  `preference1` VARCHAR(100),
  `preference2` VARCHAR(100),
  `preference3` VARCHAR(100),
  `status` VARCHAR(50) DEFAULT 'Pending',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Contact Messages Table
CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `message` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. OTP Verification Table
CREATE TABLE IF NOT EXISTS `otps` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `phone_number` VARCHAR(20) NOT NULL,
  `otp_code` VARCHAR(6) NOT NULL,
  `is_verified` BOOLEAN DEFAULT FALSE,
  `expires_at` TIMESTAMP NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
