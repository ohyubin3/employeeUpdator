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

-- department data
INSERT INTO departments (departments_name)
VALUES ("Executives"),
       ("Customer Services"),
       ("Sales"),
       ("Developments"),
       ("Training");
       
-- roles data
INSERT INTO roles (title, salary, department_id)
VALUES ("President", 200000, 1),
       ("Vice President", 150000, 1),
       ("CS Manager", 80000, 2),
       ("CS Rep", 50000, 2),
       ("Sales Manager", 85000, 3),
       ("Sales Rep", 60000, 3),
       ("Dev Manager", 90000, 4),
       ("Dev Rep", 65000, 4),
       ("Cheif Trainer", 70000, 5);

-- employee data
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Jones", 1, 0),
       ("Duran", "Ghost", 2, 1),
       ("Haily", "Houston", 3, 2),
       ("Von", "Paris", 4, 3),
       ("Derek", "Han", 5, 2),
       ("Dallas", "Rhode", 6, 5),
       ("Sara", "Lu", 7, 2),
       ("Tiffany", "Zales", 8, 7),
       ("Thrall", "Orc", 9, 2);