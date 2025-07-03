const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/User");
const TimeSlot = require("../models/TimeSlot");
const Appointment = require("../models/Appointment");

let professorToken, studentToken, slotId;

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/appointment_system_test");
  await User.deleteMany();
  await TimeSlot.deleteMany();
  await Appointment.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Register & Login Professor", async () => {
  await request(app).post("/register").send({
    name: "Prof. P1",
    email: "p1@test.com",
    password: "test123",
    role: "professor",
  });

  const res = await request(app).post("/login").send({
    email: "p1@test.com",
    password: "test123",
  });

  professorToken = res.body.token;
  expect(professorToken).toBeDefined();
});

test("Register & Login Student", async () => {
  await request(app).post("/register").send({
    name: "Student A1",
    email: "a1@test.com",
    password: "test123",
    role: "student",
  });

  const res = await request(app).post("/login").send({
    email: "a1@test.com",
    password: "test123",
  });

  studentToken = res.body.token;
  expect(studentToken).toBeDefined();
});

test("Professor Adds Slot", async () => {
  const res = await request(app)
    .post("/professor/add-slot")
    .set("Authorization", `Bearer ${professorToken}`)
    .send({ time: "2025-05-02T10:00" });

  expect(res.statusCode).toBe(200);
});

test("Student Views Slots", async () => {
  const prof = await User.findOne({ email: "p1@test.com" });

  const res = await request(app)
    .get(`/student/view-slots/${prof._id}`)
    .set("Authorization", `Bearer ${studentToken}`);

  expect(res.body.length).toBeGreaterThan(0);
  slotId = res.body[0]._id;
});

test("Student Books Appointment", async () => {
  const res = await request(app)
    .post("/student/book")
    .set("Authorization", `Bearer ${studentToken}`)
    .send({ slotId });

  expect(res.text).toBe("Appointment booked successfully");
});

test("Student Views Booked Appointments", async () => {
  const res = await request(app)
    .get("/student/my-appointments")
    .set("Authorization", `Bearer ${studentToken}`);

  expect(res.body.length).toBe(1);
});
