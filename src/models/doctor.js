const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  contactNo: { type: String, required: true },
  experience: { type: String, required: true },
  qualification: { type: String, required: true },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  salary: { type: Number, required: true },
  address: { type: String, required: true },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
