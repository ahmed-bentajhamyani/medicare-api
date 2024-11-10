const express = require("express");
const router = express.Router();
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
} = require("../controllers/patient.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all patients
router.get("/", verifyToken, getPatients);

// get a user
router.get("/:id", verifyToken, getPatient);

// add a patient
router.post("/", verifyToken, createPatient);

// update a patient
router.put("/:id", verifyToken, updatePatient);

module.exports = router;
