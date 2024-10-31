const mongoose = require("mongoose");
const userModel = require("../models/user.model");

const doctorSchema = new mongoose.Schema({
  experience: {
    type: Number,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  specialization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Specialization",
    required: false,
  },
});

module.exports = userModel.discriminator("Doctor", doctorSchema);
