require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./configs/dbConnection");
const corsOptions = require("./configs/corsOptions");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const doctorRoute = require("./routes/doctor.route");
const patientRoute = require("./routes/patient.route");
const consultationRoute = require("./routes/consultation.route");

const app = express();

const PORT = process.env.PORT || 8000;

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// auth route
app.use("/auth", authRoute);

// other routes
app.use("/api/users", userRoute);
app.use("/api/doctors", doctorRoute);
app.use("/api/patients", patientRoute);
app.use("/api/consultations", consultationRoute);

app.use("/", (req, res) => {
  res.json({ message: "Welcome to my MediCare API" });
});

// database connection
dbConnection();

app.listen(PORT, () => console.log("Server is running on port", PORT));
