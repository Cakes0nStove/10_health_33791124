# Create database script for vitacore

# Create the database
CREATE DATABASE IF NOT EXISTS health;
USE health;

# Create the tables
CREATE TABLE IF NOT EXISTS vitamins (
    id     INT AUTO_INCREMENT,
    vitamin   VARCHAR(50),
    price  DECIMAL(5, 2),
    description TEXT,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    action VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

# Create the application user
DROP USER IF EXISTS 'health_app'@'localhost';
CREATE USER IF NOT EXISTS 'health_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON health.* TO 'health_app'@'localhost';

