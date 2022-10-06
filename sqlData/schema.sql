DROP DATABASE IF EXISTS employeeUpdate_db;
CREATE DATABASE employeeUpdate_db;

USE employeeUpdate_db;

CREATE TABLE departments (
  departments_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departments_name VARCHAR(30) NOT NULL);
  
CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT
  );
  
CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT
);