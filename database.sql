CREATE DATABASE website_db;
USE website_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
    city VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);