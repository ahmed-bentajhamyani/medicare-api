require("dotenv").config();
const express = require("express");
const dbConnection = require("./configs/dbConnection");

const authRoute = require("./routes/auth.route");

const app = express();

// built-in middleware for json
app.use(express.json());

// auth route
app.use("/auth", authRoute);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to my MediCare API" });
});

// database connection
dbConnection();

module.exports = app;
