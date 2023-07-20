const express = require("express");
const router = express.Router();
const {
  patientSignUp,
  updatePatient,
  deletePatient,
  updatePatientPassword,
  patientLogin,
  getPatients,
  getMe,
  addmedicalrecord,
  getMedicalRecords,
  getsinglemedicalrecord,
  updatePatientMedicalRecord,
  adddentalchart,
  getdentalchart,
  updatePatientByAdmin
} = require("../controllers/patient");
const { patientProtect } = require("../middleware/auth");

// Add a new patient

console.log("hitttting");
router.post("/signUp", patientSignUp);

router.get("/", getPatients);
router.get("/medicalrecords", getMedicalRecords);
router.post("/dentalChart", adddentalchart);
router.get("/dentalChart", getdentalchart);
router.patch("/update/medicalrecord", updatePatientMedicalRecord);
router.get("/myprofile", patientProtect, getMe);
router.post("/addmedicalrecord", addmedicalrecord);
router.get("/:patientid", getsinglemedicalrecord);

// Update a patient's information
router.patch("/update", patientProtect, updatePatient);
router.patch("/updateByAdmin", updatePatientByAdmin);
// Delete a patient
router.delete("/:id", deletePatient);

// Update a patient's password
router.put("/updatepassword/:id", updatePatientPassword);

// Patient login (No authentication middleware applied)
router.post("/login", patientLogin);

module.exports = router;
