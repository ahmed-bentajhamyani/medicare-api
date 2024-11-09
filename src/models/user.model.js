const mongoose = require("mongoose");
const { UserGender } = require("../enums/userGender");
const { UserRole } = require("../enums/userRole");

const baseOptions = {
  discriminatorKey: "itemtype", // our discriminator key, could be anything
  collection: "items", // the name of our collection
};

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter the username"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter the email"],
    },
    password: {
      type: String,
      required: [true, "Please enter the password"],
    },
    birthDate: {
      type: Date,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      enum: [UserGender.MALE, UserGender.FEMALE],
      required: false,
    },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT],
      default: UserRole.PATIENT,
    },
    refreshToken: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
  baseOptions
);

module.exports = mongoose.model("User", UserSchema);
