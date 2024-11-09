const express = require("express");
const router = express.Router();
const {
  getDoctors,
  createDoctor,
  updateDoctor,
} = require("../controllers/doctor.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all doctors
router.get("/", verifyToken, getDoctors);

// add a doctor
router.post("/", verifyToken, createDoctor);

// update a doctor
router.put("/:id", verifyToken, updateDoctor);

module.exports = router;
