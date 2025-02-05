const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["doctor", "admin"], required: true }
});
const User = mongoose.model("User", UserSchema);

// Patient Schema
const PatientSchema = new mongoose.Schema({
  name: String,
  photo: String,
  age: Number,
  gender: String,
  medicalHistory: String,
  treatmentRecords: [
    {
      bloodPressure: String,
      infusionDose: [Number],
      bloodSugar: [Number],
      recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now }
    }
  ]
});
const Patient = mongoose.model("Patient", PatientSchema);

// Register User
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, role });
  await newUser.save();
  res.json({ message: "User registered" });
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, "secret", { expiresIn: "1d" });
  res.json({ token, role: user.role });
});

// Add Patient (Admin Only)
app.post("/patients", async (req, res) => {
  const { name, photo, age, gender, medicalHistory } = req.body;
  const newPatient = new Patient({ name, photo, age, gender, medicalHistory });
  await newPatient.save();
  res.json({ message: "Patient added" });
});

// Add Treatment Record (Admin Only)
app.post("/patients/:id/treatment", async (req, res) => {
  const { id } = req.params;
  const { bloodPressure, infusionDose, bloodSugar, recordedBy } = req.body;
  const patient = await Patient.findById(id);
  if (!patient) return res.status(404).json({ message: "Patient not found" });

  patient.treatmentRecords.push({ bloodPressure, infusionDose, bloodSugar, recordedBy });
  await patient.save();
  res.json({ message: "Treatment record added" });
});

// Get All Patients (Admin View)
app.get("/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

// Get Blood Sugar Data (Doctor View)
app.get("/patients/blood-sugar", async (req, res) => {
  const patients = await Patient.find({}, { name: 1, "treatmentRecords.bloodSugar": 1 });
  res.json(patients);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));// JavaScript Document