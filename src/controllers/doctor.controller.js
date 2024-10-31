const { UserRole } = require("../enums/userRole.js");
const userModel = require("../models/user.model.js");
const doctorModel = require("../models/doctor.model.js");
const bcrypt = require("bcrypt");

// get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find().sort({ createdAt: -1 });
    return res.status(200).json(doctors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create user
const createDoctor = async (req, res) => {
  const { password, ...data } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = {
      ...data,
      password: hashedPassword,
    };

    const newDoctor = await doctorModel.create(doctor);
    return res.status(201).json(newDoctor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update user
const updateDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await doctorModel.findByIdAndUpdate(id, req.body);

    if (!user) return res.status(404).json({ message: "Doctor not found." });

    const updatedUser = await userModel.findById(id);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
};
