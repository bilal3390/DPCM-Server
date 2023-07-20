const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment");
const { patientProtect } = require("../middleware/auth");
const { protect } = require("../middleware/auth");

// Add admin
router.post("/", patientProtect, appointmentController.createAppointment);

// Remove admin
router.get("/", protect, appointmentController.getAppointmentsForAdmin);

// Update admin
router.patch(
  "/:appointmentId",
  protect,
  appointmentController.updateAppointment
);

module.exports = router;
