const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

const dbConnection = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connection to the database succeeded!");
    })
    .catch(() => console.log("Connection to the database failed!"));
};

module.exports = dbConnection;
