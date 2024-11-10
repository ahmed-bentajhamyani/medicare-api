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

// get a patient
const getPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await patientModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create user
const createPatient = async (req, res) => {
  const { email, username, password, birthDate, role, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      email,
      username,
      password: hashedPassword,
      birthDate,
      role,
      address,
    };

    const newUser = await patientModel.create(user);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update user
const updatePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await patientModel.findByIdAndUpdate(id, req.body);

    if (!user) return res.status(404).json({ message: "User not found." });

    const updatedUser = await patientModel.findById(id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
};
