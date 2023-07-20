const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.addDoctor = async (req, res) => {
  try {
    const { email, password, age, contactNo, experience, qualification, name, gender, salary, address,admin } = req.body;
    const doctorExists = await Doctor.findOne({ email });

    if (doctorExists) {
      return res.status(400).json({ error: 'Doctor with this email already exists' });
    }

    const doctor = await Doctor.create({ email, password, age, contactNo, experience, qualification, name, gender, salary, address,admin });
    res.status(201).json(doctor);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.getDoctors = async (req, res) => {
  try {
    const doctor = await Doctor.find();
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, age, contactNo, experience, qualification, name, gender, salary, address } = req.body;

    // Check if email already exists in the database
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor && existingDoctor._id.toString() !== id) {
      return res.status(400).json({ error: 'This email is already taken' });
    }

    const doctor = await Doctor.findByIdAndUpdate(id, { email, password, age, contactNo, experience, qualification, name, gender, salary, address }, { new: true });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


//
exports.updateDoctorPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    if (doctor.password !== oldPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    doctor.password = newPassword;
    await doctor.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};



exports.doctorLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log(doctor)
    const token = jwt.sign({ userId: doctor._id }, JWT_SECRET);
    res.status(200).json({ message: 'Login successful', token,doctor });
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
};


