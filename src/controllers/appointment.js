const Appointment = require("../models/appointment");

// Controller for creating an appointment
exports.createAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { adminId, date, time, reason } = req.body;

    // Create a new appointment
    const appointment = await Appointment.create({
      patient: userId,
      admin: adminId,
      date: date,
      time: time,
      reason: reason,
    });

    // Save the appointment to the database

    res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create appointment",
      error: error.message,
    });
  }
};

exports.getAppointmentsForAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;

    // Find all appointments for the admin
    const appointments = await Appointment.find({ admin: adminId });

    res.status(200).json({
      success: true,
      results: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch appointments",
      error: error.message,
    });
  }
};
 // User Can update appointment (not complete)
  
exports.updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { isApproved } = req.body;
    console.log(appointmentId);
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Update the appointment's approval status
    appointment.isApproved = isApproved;

    // Save the updated appointment
    await appointment.save();

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update appointment",
      error: error.message,
    });
  }
};
