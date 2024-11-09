const mongoose = require("mongoose");

const SpecializationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Specialization", SpecializationSchema);
