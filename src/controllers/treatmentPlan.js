const TreatmentPlan = require("../models/treatmentPlan");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.createTreatmentPlan = async (req, res) => {
  try {
    const { patientId, doctorId, diagnosis, medication, instructions } =
      req.body;
    console.log(req.body)
    // Create a new treatment plan
    const treatmentPlan = await TreatmentPlan.create({
      patient: patientId,
      doctor: doctorId,
      diagnosis: diagnosis,
      medications: medication,
      instructions: instructions,
    });

    res.status(201).json({ success: true, data: treatmentPlan });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create treatment plan",
      error: error.message,
    });
  }
};
exports.getTreatmentPlanDoctor = async (req, res) => {
  try {
    const { doctorid } =
      req.params;
    // Create a new treatment plan
    const treatmentPlan = await TreatmentPlan.find({doctor:doctorid}).populate("doctor");
    res.status(200).json({ success: true, data: treatmentPlan });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
      error: error.message,
    });
  }
};
exports.getTreatmentPlanpatient = async (req, res) => {
  try {
    const { patientid } =
      req.params;
    const treatmentPlan = await TreatmentPlan.find({patient:patientid}).populate("patient").populate('doctor');
    console.log(treatmentPlan)
    res.status(200).json({ success: true, data: treatmentPlan });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Not found",
      error: error.message,
    });
  }
};
