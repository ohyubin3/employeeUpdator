const mysql = require("mysql2/promise");
let inquirer = require("inquirer");

let connection;

initialize();
main();

async function initialize() {
  connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "",
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
    {
      type: "input",
      name: "last_name",
      message: "What's your last name",
      default() {
        return "Doe";
      },
    },
  ]);

  console.log(responseObject);

  // query database
  const [rows] = await connection.execute(
    `SELECT * FROM employees where firstname = ?`,
    [responseObject.first_name]
  );
  console.table(rows);
}
