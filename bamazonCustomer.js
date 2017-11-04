const colors = require('colors');
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table")

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting:" + err.stack);
  }
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start(res);
  });
}

function start(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Which product would you like to buy? [Quit with Q]".white,
        validate: function(val) {
          // console.log(" val", val);
          return !isNaN(val) || val.toLowerCase() === "q";
          console.log(" val", val);
        }
      }
    ])
    .then(function(val) {
      // console.log('val', val)
      console.log('inventory', inventory[val.choice - 1])
      checkIfExit(val.choice)
      var choiceId = inventory[val.choice - 1];
      var product = choiceId;
      // console.log("val", val);
      // console.log(checkInventory(choiceId, inventory));
      if (product) {
        // console.log("product", product);
        updateProducts(product)
      }
      else {
        console.log("\nThat item is not in our inventory.")
        readProducts();
      }
    });
}

function updateProducts(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many do you want?".white,
        validate: function(value) {
          return value > 0 || value.toLowerCase() === "q";
        }
      }
    ]).then(function(answer) {
      // console.log("answer", answer);
      if (answer.quantity > product.stock_quantity) {
        console.log("Insufficient quantity!");
        // console.log("answer", answer);
        readProducts();
      }
      else {
        makePurchase(product, answer.quantity)
        // console.log("makepurchase function",product, answer.quantity);
      }
    })
}

function makePurchase(product, quantity) {
  console.log("before connection.query \n", product, quantity);
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      console.log("\n sucessfully bought " + quantity + " " + product.product_name);
      readProducts();
    }
  )
}

  function checkInventory (choiceId, inventory) {
    // console.log("choiceId", choiceId, "inventory", inventory);
    for (var i = 0; i < inventory.length; i++) {
      // console.log("choiceId", choiceId, "inventory", inventory);
      if (inventory[i].item_id === choiceId) {
        // console.log("choiceId", choiceId, "inventory", inventory);
        return inventory[i];
        console.log(inventory[i]);
        console.log("choiceId", choiceId, "inventory", inventory);
      }
    }
    return null;
  }

  function checkIfExit(choice) {
    console.log('quit selection');
    if (choice.toLowerCase() === 'q') {
      console.log("Goodbye!");
      process.exit(0);
    }
  }
