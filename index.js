const mysql = require("mysql2/promise");
let inquirer = require("inquirer");

let connection;

initialize();
main();

async function initialize() {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "employeeupdate_db",
  });
}

async function main() {
  console.log(`
╔═══════════════════════════════════════════════════╗
║                                                   ║
║                   Employee Manager                ║
║                                                   ║
╚═══════════════════════════════════════════════════╝
    `);
  // get the client
  // create the connection
  const responseObject = await inquirer.prompt([
    {
      type: "list",
      name: "main_menu",
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

  //   console.log(responseObject);
  //   // query database
  //   const [rows] = await connection.execute(`SELECT * FROM employees`, [
  //     responseObject,
  //   ]);
  //   console.table(rows);
}
