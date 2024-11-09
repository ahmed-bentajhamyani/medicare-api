const consultationModel = require("../models/consultation.model.js");
const userModel = require("../models/user.model.js");
const { ConsultationStatus } = require("../enums/consultationStatus.js");

// get all consultations
const getConsultations = async (req, res) => {
  try {
    const consultations = await consultationModel
      .find()
      .populate("patient")
      .populate("doctor")
      .sort({ createdAt: -1 });
    return res.status(200).json(consultations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get all pending consultations
const getPendingConsultations = async (req, res) => {
  try {
    const pendingConsultations = await consultationModel
      .find({ status: ConsultationStatus.PENDING })
      .populate("patient")
      .populate("doctor")
      .sort({ createdAt: -1 });
    return res.status(200).json(pendingConsultations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get consultations by doctor
const getConsultationsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const pendingConsultations = await consultationModel
      .find({ doctor: doctorId })
      .populate("patient")
      .populate("doctor")
      .sort({ createdAt: -1 });
    return res.status(200).json(pendingConsultations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get consultations by patient
const getConsultationsByPatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    const pendingConsultations = await consultationModel
      .find({ patient: patientId })
      .populate("patient")
      .populate("doctor")
      .sort({ createdAt: -1 });
    return res.status(200).json(pendingConsultations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get a consultation
const getConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await consultationModel
      .findById(id)
      .populate("patient")
      .populate("doctor");
    return res.status(200).json(consultation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// create consultation
const createConsultation = async (req, res) => {
  const { date, doctorUsername } = req.body;
  const patientId = res.userId;

  try {
    const patient = await userModel.findById(patientId);
    const doctor = await userModel.findOne({ username: doctorUsername });

    const consultation = {
      date,
      patient: patient._id,
      doctor: doctor._id,
    };

    const newConsultation = await consultationModel.create(consultation);
    return res.status(201).json(newConsultation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// update consultation
const updateConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await consultationModel.findByIdAndUpdate(
      id,
      req.body
    );

    if (!consultation)
      return res.status(404).json({ message: "Consultation not found." });

    const updatedconsultation = await consultationModel.findById(id);
    return res.status(200).json(updatedconsultation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// accept consultation
const acceptConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await consultationModel.findByIdAndUpdate(id, {
      status: ConsultationStatus.ACCEPTED,
    });

    if (!consultation)
      return res.status(404).json({ message: "Consultation not found." });

    const updatedconsultation = await consultationModel.findById(id);
    return res.status(200).json(updatedconsultation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// reject consultation
const rejectConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await consultationModel.findByIdAndUpdate(id, {
      status: ConsultationStatus.REJECTED,
    });

    if (!consultation)
      return res.status(404).json({ message: "Consultation not found." });

    const updatedconsultation = await consultationModel.findById(id);
    return res.status(200).json(updatedconsultation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete consultation
const deleteConsultation = async (req, res) => {
  const { id } = req.params;

  try {
    const consultation = await consultationModel.findByIdAndDelete(id);

    if (!consultation)
      return res.status(404).json({ message: "Consultation not found." });

    return res
      .status(200)
      .json({ message: "Consultation deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
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
};
