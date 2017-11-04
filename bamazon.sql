DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chicken Nuggets ", "Food", 10.00, 500),
  ("Pop Tarts ", "Food", 6.00, 300),
  ("Apples ", "Food", 1.00, 100),
  ("IPhones ", "Electronics", 1000.00, 50),
  ("Monitors ", "Electronics", 250.00, 100),
  ("Play Station 4's ", "Electronics", 250.00, 40),
  ("Cars", "Automotive ", 12000, 5),
  ("Trucks", "Automotive", 22000, 5),
  ("Coke", "Drinks", 1.00, 250),
  ("Pepsi", "Drinks", 1.00, 250);
