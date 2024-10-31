const mongoose = require("mongoose");
const userModel = require("../models/user.model");

const patientSchema = new mongoose.Schema({
  address: {
    type: String,
    required: false,
  },
});

module.exports = userModel.discriminator("Patient", patientSchema);
