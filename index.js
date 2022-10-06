// get the client
const mysql = require("mysql2/promise");
let inquirer = require("inquirer");
// const Connection = require("mysql2/typings/mysql/lib/Connection");
let connection;

initialize();
main();

// create the connection
async function initialize() {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeeupdate_db",
  });
}

// Main menu to select the user needs
async function main() {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║                                                   ║
║                                                   ║
║                  Employee Manager                 ║
║                                                   ║
║                                                   ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
    `);
  const responseObject = await inquirer.prompt([
    {
      type: "list",
      name: "wantTodo",
      message: "What would you like to do?",
      choices: [
        "1. View All the Employees",
        "2. View All the Departments",
        "3. View All the Roles",
        "4. Add an Employee",
        "5. Add a Department",
        "6. Add a Role",
        "7. Update an Employee Role",
        "8. QUIT",
      ],
    },
  ]);

  console.log(`You have selected   ▶▶   "${responseObject.wantTodo}"   ◀◀`);
  // query database "ALL EMPLOYEES"
  if (responseObject.wantTodo === "1. View All the Employees") {
    const [rows] = await connection.execute(
      `SELECT employee_id, first_name, last_name, title, roles.role_id, manager_id
    FROM employees
    JOIN roles ON employees.role_id = roles.role_id
    ORDER BY role_id`,
      [responseObject.wantTodo]
    );
    console.table(rows);
    appendBar();
    end();
  }
  // query database "All Departments"
  if (responseObject.wantTodo === "2. View All the Departments") {
    const [rows] = await connection.execute(`SELECT * FROM departments`, [
      responseObject.wantTodo,
    ]);
    console.table(rows);
    appendBar();
    end();
  }
  // query database "Roles"
  if (responseObject.wantTodo === "3. View All the Roles") {
    const [rows] = await connection.execute(`SELECT * FROM roles`, [
      responseObject.wantTodo,
    ]);
    console.table(rows);
    appendBar();
    end();
  }
  // query database to "add employee"
  if (responseObject.wantTodo === "4. Add an Employee") {
    addEmployee();
  }
  // query database to "add department"
  if (responseObject.wantTodo === "5. Add a Department") {
    addDepart();
  }
  // query database to "add role"
  if (responseObject.wantTodo === "6. Add a Role") {
    addRole();
  }
  // query database to "update employee role"
  if (responseObject.wantTodo === "7. Update an Employee Role") {
    updateEmp();
  }
  //  Quit the application
  if (responseObject.wantTodo === "8. QUIT") {
    process.exit();
  }
}

// Selected Menu Functions //

// Adds new Employee
async function addEmployee() {
  const addEmp = await inquirer.prompt([
    {
      type: "input",
      name: "newFirstName",
      message: "Please enter the first name of the new employee.",
    },
    {
      type: "input",
      name: "newLastName",
      message: "Please enter the last name of the new employee.",
    },
    {
      type: "input",
      name: "empRole",
      message: "Please enter the role_id for the new employee.",
    },
    {
      type: "input",
      name: "empManager",
      message: "Please enter the manager_id for the new employee.",
    },
  ]);
  const [rows] = await connection.execute(
    `INSERT INTO employees (first_name, last_name, role_id, manager_id)
      VALUES (?,?,?,?)`,
    [addEmp.newFirstName, addEmp.newLastName, addEmp.empRole, addEmp.empManager]
  );
  console.log(`
  
  ▣ New employee has been added to the database ▣
  
  `);
  end();
}

// Adds new department
async function addDepart() {
  const addDepartName = await inquirer.prompt([
    {
      type: "input",
      name: "newDepart",
      message: "Please enter the name of the new department.",
    },
  ]);
  const [rows] = await connection.execute(
    `INSERT INTO departments (departments_name)
  VALUES (?)`,
    [addDepartName.newDepart]
  );
  console.log(`
  
  ▣ New department has been added to the database ▣
  
  `);
  end();
}

// Adds new role
async function addRole() {
  const addRoles = await inquirer.prompt([
    {
      type: "input",
      name: "newRoleName",
      message: "Please enter the name of the new role.",
    },
    {
      type: "input",
      name: "newRoleSalary",
      message: "Please enter the salary for this role.",
    },
    {
      type: "input",
      name: "newRoleDepId",
      message: "Please assign the department ID for this role.",
    },
  ]);
  console.log(addRoles);
  // Insert data to columns
  const [newRole] = await connection.execute(
    `INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)`,
    [addRoles.newRoleName, addRoles.newRoleSalary, addRoles.newRoleDepId]
  );
  console.log(`
  
  ▣ New role has been added to the database ▣
  
  `);
  end();
}

// Update Employee function
async function updateEmp() {
  // View all the employees for reference
  const [showEmpList] = await connection.execute(
    `SELECT first_name, last_name, role_id FROM employees`
  );
  console.table(showEmpList);
  // View all the roles for reference
  const [showRoleList] = await connection.execute(
    `SELECT title, role_id FROM roles`
  );
  console.table(showRoleList);
  // View all the departments for reference
  const [showDepList] = await connection.execute(
    `SELECT departments_name, departments_id FROM departments`
  );

  // Variable to select columns from the table database
  const [rawEmpData] = await connection.execute(
    `SELECT *
    FROM employees
    JOIN roles
    ON employees.role_id = roles.role_id`
  );
  const empUpdate = await inquirer.prompt([
    {
      type: "list",
      name: "empToUpdateRole",
      message: "Which employee needs their role updated?",
      choices: rawEmpData.map((employee) => ({
        value: employee.employee_id,
        name:
          employee.employee_id +
          ".  " +
          employee.first_name +
          "," +
          " " +
          employee.last_name +
          "     /    Current role :  " +
          employee.title,
      })),
    },
    {
      type: "list",
      name: "assignNewRole",
      message: "Please select the new role_id to assign.",
      choices: showRoleList.map((role) => ({
        value: role.role_id,
        name: role.role_id + "  =  " + role.title,
      })),
    },
  ]);
  // update original role into a new role with selected employee
  const [updateRole] = await connection.execute(
    `UPDATE employees
    SET role_id = ?
    WHERE employee_id = ?`,
    [empUpdate.assignNewRole, empUpdate.empToUpdateRole]
  );
  // Show updated data
  const [updatedEmp] = await connection.execute(
    `SELECT first_name, last_name, title, roles.role_id
    FROM employees
    JOIN roles ON employees.role_id = roles.role_id
    WHERE employee_id = ?`,
    [empUpdate.empToUpdateRole]
  );
  console.table(updatedEmp);
  console.log(`
  
  ▣ New role has been assigned to the employee ▣
  
  `);
  end();
}

// Simple bar showing where the data appended
function appendBar() {
  console.log(
    `

↑                                                                        ↑
└─────────────────────────────Data Appended──────────────────────────────┘

`
  );
}

// Asks if the user want to quit
function end() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "end",
        message:
          "Would you like to quit? (Selecting 'No' will take you back to the Main Menu)",
        choices: ["Yes", "No"],
      },
    ])
    .then((endResponse) => {
      if (endResponse.end === "Yes") {
        process.exit();
      }
      if (endResponse.end === "No") {
        console.log(
          `

                                                                                  `
        );
        main();
      }
    });
}
