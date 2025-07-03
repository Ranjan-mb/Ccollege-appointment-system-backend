const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
  professorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  time: Date,
  isBooked: { type: Boolean, default: false },
});

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
