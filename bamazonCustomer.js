var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port;
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Sverige94sek!",
    database: "bamazon_db"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);    
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM orders", function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
}


