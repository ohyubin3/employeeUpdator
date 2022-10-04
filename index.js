// get the client
const mysql = require("mysql2/promise");
let inquirer = require("inquirer");
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
    const [rows] = await connection.execute(`SELECT * FROM employees`, [
      responseObject.wantTodo,
    ]);
    console.table(rows);
    appendBar();
    end();
  }
  if (responseObject.wantTodo === "2. View All the Departments") {
    const [rows] = await connection.execute(`SELECT * FROM departments`, [
      responseObject.wantTodo,
    ]);
    console.table(rows);
    appendBar();
    end();
  }
  if (responseObject.wantTodo === "3. View All the Roles") {
    const [rows] = await connection.execute(`SELECT * FROM roles`, [
      responseObject.wantTodo,
    ]);
    console.table(rows);
    appendBar();
    end();
  }
  if (responseObject.wantTodo === "8. QUIT") {
    end();
  }
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
          "Would you like to quit? (Select No to go back to the Main Menu)",
        choices: ["Yes", "No"],
      },
    ])
    .then((endResponse) => {
      if (endResponse.end === "Yes") {
        console.log(`

    ┌                                                                ┐
            Press "ctrl + c"  or  "cmd + c" in order to quit.
    └                                                                ┘

    `);
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
