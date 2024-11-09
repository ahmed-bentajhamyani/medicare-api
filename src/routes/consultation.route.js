const express = require("express");
const router = express.Router();
const {
  getConsultations,
  getPendingConsultations,
  getConsultationsByDoctor,
  getConsultationsByPatient,
  getConsultation,
  createConsultation,
  updateConsultation,
  acceptConsultation,
  rejectConsultation,
  deleteConsultation,
} = require("../controllers/consultation.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all consultations
router.get("/", getConsultations);

// get all pending consultations
router.get("/pending", getPendingConsultations);

// get consultations by doctor
router.get("/by-doctor/:doctorId", getConsultationsByDoctor);

// get consultations by patient
router.get("/by-patient/:patientId", getConsultationsByPatient);

// get a consultation
router.get("/:id", getConsultation);

// add consultation
router.post("/", verifyToken, createConsultation);

// update consultation
router.put("/:id", updateConsultation);

// accept consultation
router.put("/accept/:id", acceptConsultation);

// reject consultation
router.put("/reject/:id", rejectConsultation);

// delete consultation
router.delete("/:id", deleteConsultation);

module.exports = router;
