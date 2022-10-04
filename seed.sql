-- department data
INSERT INTO departments (departments_name)
VALUES ("Executives"),
       ("Customer Services"),
       ("Sales"),
       ("Developments");
       
-- roles data
INSERT INTO roles (title, salary, department_id)
VALUES ("President", 200000, 1),
       ("Vice President", 150000, 1),
       ("CS Manager", 80000, 2),
       ("CS Rep", 50000, 2),
       ("Sales Manager", 85000, 3),
       ("Sales Rep", 60000, 3),
       ("Dev Manager", 90000, 4),
       ("Dev Rep", 65000, 4);

-- employee data
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("James", "Jones", 1, null),
       ("Duran", "Ghost", 2, 1),
       ("Haily", "Houston", 3, null),
       ("Von", "Paris", 4, 3),
       ("Derek", "Han", 5, null),
       ("Dallas", "Rhode", 6, 5),
       ("Sara", "Lu", 7, null),
       ("Tiffany", "Zales", 8, 7);