CREATE DATABASE hospital_db;
USE hospital_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'doctor')
);

CREATE TABLE patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    photo VARCHAR(255),
    age INT,
    gender ENUM('Male', 'Female'),
    medical_history TEXT
);

CREATE TABLE treatments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    blood_pressure VARCHAR(20),
    infusion_dose1 INT,
    infusion_dose2 INT,
    infusion_dose3 INT,
    blood_sugar1 INT,
    blood_sugar2 INT,
    blood_sugar3 INT,
    blood_sugar4 INT,
    recorded_by INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id)
);// JavaScript Document