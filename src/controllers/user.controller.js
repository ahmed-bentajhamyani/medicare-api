const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get a user
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create user
const createUser = async (req, res) => {
  const { password, ...data } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { ...data, password: hashedPassword };

    const newUser = await userModel.create(user);
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
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

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
