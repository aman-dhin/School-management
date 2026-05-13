const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

connection.connect((err) => {
  if (err) {
    console.log("Database connection failed", err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = connection;