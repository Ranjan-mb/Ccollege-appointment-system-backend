const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  slotId: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlot" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
