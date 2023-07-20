const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor');

// Add a new doctor
router.post('/', doctorController.addDoctor);
router.get('/get', doctorController.getDoctors);

// Update an existing doctor
router.put('/:id', doctorController.updateDoctor);

// Delete a doctor
router.delete('/:id', doctorController.deleteDoctor);

// Update Docotor Password
router.patch('/updatepassword/:id', doctorController.updateDoctorPassword);

// Doctor login
router.post('/login', doctorController.doctorLogin);

module.exports = router;
