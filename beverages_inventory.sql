-- Beverages Inventory Database
-- Run this file to create the database, tables, and sample data.
-- Usage: mysql -u root -p < beverages_inventory.sql

CREATE DATABASE IF NOT EXISTS beverages_inventory;
USE beverages_inventory;

-- Admin users table (passwords are hashed with bcrypt at runtime via scripts/seed.js)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Beverages inventory table
CREATE TABLE IF NOT EXISTS beverages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    supplier VARCHAR(100),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample inventory data
INSERT INTO beverages (name, category, quantity, price, supplier) VALUES
('Coca-Cola 50cl', 'Soft Drink', 120, 250.00, 'NBC Distributors'),
('Heineken Lager 33cl', 'Beer', 80, 500.00, 'Nigerian Breweries'),
('Five Alive Pulpy Orange 1L', 'Juice', 45, 900.00, 'Coca-Cola Nigeria'),
('Eva Water 75cl', 'Water', 200, 150.00, 'FanMilk Ltd'),
('Red Bull 250ml', 'Energy Drink', 60, 700.00, 'Red Bull Nigeria');

-- NOTE: The default admin user is created separately by running `npm run seed`
-- after installing dependencies. This keeps the password properly bcrypt-hashed
-- instead of storing a plaintext or guessed hash in this file.
