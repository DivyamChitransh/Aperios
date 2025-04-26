# Checkout and Order Service API
# Introduction
This is my backend project in which I have implemented a Simple Checkout and Order Service in Node , Express and Mongo(NEM). So , In this project I had made different models , controllers and Routes . 

# Live Demo 
Running my Service at: https://checkout-and-order-service.onrender.com

# Features
View cart details with subtotal, discount, delivery charges, and final total

Apply promo codes for flat or percentage discounts

Update cart and item quantities

Remove items from cart

# API endpoints
Post - /user/signup (For Signup of a new user)

Post - /user/login (To login a user)

Post - /Item/add (To Add a new Item)

Get - /Item (Get all items)

Post - /cart/add (Add new item to cart)

Get - /cart (get cart based on userID)

Post - /orders/place (Place a new order)

Post - /orders/myorders (check for the orders)

Patch - /orders/status/:orderId (Update the status)

# Tech Stack

Node.js (Runtime environment)

Express.js (Backend JS Framework)

MongoDB (Database for storing collections)

JWT (For Creating and verifying tokens for authorization)

Node-Cron (For Scheduling of orders)


## Getting Started


```bash
git clone https://github.com/DivyamChitransh/Checkout-Order-Service.git

npm init -y

cd Aperios 

npm install express mongoose jsonwebtoken bcrypt dotenv helmet morgan bcrypt node-cron nodemon

Run using - nodemon app.js or node app.js

```