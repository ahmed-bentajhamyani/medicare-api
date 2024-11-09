const express = require("express");
const router = express.Router();
const {
  getUsers,
  getDoctors,
  getPatients,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all users
router.get("/", verifyToken, getUsers);

// get all doctors
// router.get("/doctors", verifyToken, getDoctors);

// get all patients
// router.get("/patients", verifyToken, getPatients);

// get a user
router.get("/:id", verifyToken, getUser);

// add user
router.post("/", verifyToken, createUser);

// update user
router.put("/:id", verifyToken, updateUser);

// delete user
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
