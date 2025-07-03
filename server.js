const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/appointment_system").then(() => {
  console.log("MongoDB Connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
