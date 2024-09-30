require("dotenv").config();
const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.json({ message: "Welcome to my MediCare API" });
});

module.exports = app;
