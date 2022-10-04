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
  // get the client
  // create the connection
  const responseObject = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What's your first name",
    },
    // {
    //   type: "input",
    //   name: "last_name",
    //   message: "What's your last name",
    //   default() {
    //     return "Doe";
    //   },
    // },
  ]);

  console.log(responseObject);

  // query database
  const [rows] = await connection.execute(
    `SELECT * FROM employees where first_name = ?`,
    [responseObject.first_name]
  );
  console.table(rows);
}
