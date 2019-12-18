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
    displayInventory();
    shopInventory()
});

function displayInventory() {
    connection.query("SELECT * FROM orders", function (err, res) {
        if (err) throw err;
        console.log(res);
        // connection.end();
    });
}


function shopInventory() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the ID of the item you wish to purchase?"
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then((function (userPurchase) {
            connection.query("SELECT * FROM orders WHERE id=" + userPurchase.item, function (err, res) {

                for (var i = 0; i < res.length; i++) {
                    if (userPurchase.quantity > res[i].quantity) {
                        console.log("Sorry! Not enough in stock. Please try again later.");
                    }
                    else {
                        console.log("Transaction completed. Thank you.");
                        connection.query("UPDATE orders SET quantity= " + (res[i].quantity - userPurchase.quantity) + " WHERE id=" + userPurchase.item, function(err){
                            if (err) throw err;
                        });
                        displayInventory()
                    }
                }
            })

        })
        )
}


