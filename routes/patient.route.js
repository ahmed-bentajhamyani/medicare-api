const express = require("express");
const router = express.Router();
const {
  getPatients,
  createPatient,
  updatePatient,
} = require("../controllers/patient.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all patients
router.get("/", verifyToken, getPatients);

// add a patient
router.post("/", verifyToken, createPatient);

// update a patient
router.put("/:id", verifyToken, updatePatient);

module.exports = router;
