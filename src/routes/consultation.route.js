const express = require("express");
const router = express.Router();
const {
  getConsultations,
  getPendingConsultations,
  getConsultationsByDoctor,
  getConsultationsByPatient,
  getConsultationsPatientDoctor,
  getConsultation,
  createConsultation,
  updateConsultation,
  acceptConsultation,
  rejectConsultation,
  deleteConsultation,
} = require("../controllers/consultation.controller");
const verifyToken = require("../middlewares/authMiddleware");

// get all consultations
router.get("/", verifyToken, getConsultations);

// get all pending consultations
router.get("/pending", verifyToken, getPendingConsultations);

// get consultations by doctor
router.get("/by-doctor/:doctorId", verifyToken, getConsultationsByDoctor);

// get consultations by patient
router.get("/by-patient/:patientId", verifyToken, getConsultationsByPatient);

// get consultations by patient
router.get(
  "/patient-doctor/:patientId/:doctorId",
  verifyToken,
  getConsultationsPatientDoctor
);

// get a consultation
router.get("/:id", getConsultation);

// add consultation
router.post("/", verifyToken, createConsultation);

// update consultation
router.put("/:id", verifyToken, updateConsultation);

// accept consultation
router.put("/accept/:id", verifyToken, acceptConsultation);

// reject consultation
router.put("/reject/:id", verifyToken, rejectConsultation);

// delete consultation
router.delete("/:id", verifyToken, deleteConsultation);

module.exports = router;
