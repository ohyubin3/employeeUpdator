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
║                   Employee Manager                ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
    `);
  const responseObject = await inquirer.prompt([
    {
      type: "list",
      name: "wantTodo",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add an Employee",
        "Add a Department",
        "Add a Role",
        "Update an Employee Role",
        "QUIT",
      ],
    },
  ]);

  console.log(responseObject);
  // query database
  if (responseObject === "View All Employees") {
    const [rows] = await connection.execute(
      `SELECT * FROM employees`,
      responseObject.wantTodo
    );
    console.table(rows);
  }
}
