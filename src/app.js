require("dotenv").config();
const express = require("express");
const dbConnection = require("./configs/dbConnection");

const app = express();

// database connection
dbConnection();

app.use("/", (req, res) => {
  res.json({ message: "Welcome to my MediCare API" });
});

module.exports = app;
