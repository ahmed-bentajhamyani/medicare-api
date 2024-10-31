const userModel = require("../models/user.model.js");
const patientModel = require("../models/patient.model.js");
const bcrypt = require("bcrypt");

// get patients
const getPatients = async (req, res) => {
  try {
    const patients = await patientModel.find().sort({ createdAt: -1 });
    return res.status(200).json(patients);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create user
const createPatient = async (req, res) => {
  const { email, username, password, birthDate, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { email, username, password: hashedPassword, birthDate, role };

    const newUser = await userModel.create(user);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update user
const updatePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndUpdate(id, req.body);

    if (!user) return res.status(404).json({ message: "User not found." });

    const updatedUser = await userModel.findById(id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  createPatient,
  updatePatient,
};
