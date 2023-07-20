const mongoose = require("mongoose");
const MedicalRecord = new mongoose.Schema({
  patientid: {
    type: String,
  },
  fullname: {
    type: String,
  },
  dob: {
    type: String,
  },
  contact: {
    type: String,
  },
  medication: {
    type: String,
  },
  dentalhistory: {
    type: String,
  },
});

const MedicalRecords = mongoose.model("MedicalRecords", MedicalRecord);

module.exports = MedicalRecords;
