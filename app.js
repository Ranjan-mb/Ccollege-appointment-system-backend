const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const TimeSlot = require("./models/TimeSlot");
const Appointment = require("./models/Appointment");
const authenticate = require("./middleware/auth");

const app = express();
app.use(express.json());

// Register
app.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashed, role });
  await user.save();
  res.send("User registered");
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send("Invalid credentials");
  }
  const token = jwt.sign({ userId: user._id, role: user.role }, "secret123");
  res.send({ token });
});

// Add time slot
app.post("/professor/add-slot", authenticate, async (req, res) => {
  if (req.user.role !== "professor") return res.sendStatus(403);
  const slot = new TimeSlot({ professorId: req.user.userId, time: req.body.time });
  await slot.save();
  res.send("Slot added");
});

// View slots
app.get("/student/view-slots/:profId", authenticate, async (req, res) => {
  if (req.user.role !== "student") return res.sendStatus(403);
  const slots = await TimeSlot.find({ professorId: req.params.profId, isBooked: false });
  res.send(slots);
});

// Book appointment
app.post("/student/book", authenticate, async (req, res) => {
  if (req.user.role !== "student") return res.sendStatus(403);
  const slot = await TimeSlot.findById(req.body.slotId);
  if (!slot || slot.isBooked) return res.status(400).send("Invalid slot");

  slot.isBooked = true;
  await slot.save();

  const professor = await User.findById(slot.professorId);
  const appt = new Appointment({
    studentId: req.user.userId,
    professorId: professor._id,
    slotId: slot._id,
  });

  await appt.save();
  res.send("Appointment booked successfully");
});

// View student appointments
app.get("/student/my-appointments", authenticate, async (req, res) => {
  if (req.user.role !== "student") return res.sendStatus(403);
  const appts = await Appointment.find({ studentId: req.user.userId }).populate("professorId");
  res.send(appts);
});

module.exports = app;
