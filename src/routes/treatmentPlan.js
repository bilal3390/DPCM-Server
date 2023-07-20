const express = require("express");
const router = express.Router();
const treatmentPlanController = require("../controllers/treatmentPlan");

// Define routes
router.post("/", treatmentPlanController.createTreatmentPlan);
router.get("/patient/:patientid", treatmentPlanController.getTreatmentPlanpatient);
router.get("/doctor/:doctorid", treatmentPlanController.getTreatmentPlanDoctor);

// router.post('/', treatmentPlanController.addPrice);

module.exports = router;
