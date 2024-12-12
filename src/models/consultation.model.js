const mongoose = require("mongoose");
const { ConsultationStatus } = require("../enums/consultationStatus");

const ConsultationSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: [
        ConsultationStatus.PENDING,
        ConsultationStatus.ACCEPTED,
        ConsultationStatus.PENDING,
      ],
      default: ConsultationStatus.PENDING,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Consultation", ConsultationSchema);
