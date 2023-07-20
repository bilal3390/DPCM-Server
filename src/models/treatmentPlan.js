const mongoose = require("mongoose");

const treatmentPlanSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medications: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
});

const TreatmentPlan = mongoose.model("TreatmentPlan", treatmentPlanSchema);

module.exports = TreatmentPlan;

// [
//     {
//       name: {
//         type: String,
//         required: true,
//       },
//       dosage: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
