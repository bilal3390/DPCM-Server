const Patient = require("../models/patient");
const MedicalRecords =  require("../models/medicalrecord");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");
const DentalCharts = require("../models/dentalchart");

exports.patientSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const patientExists = await Patient.findOne({ email });
    if (patientExists) {
      return res
        .status(400)
        .json({ error: "Patient with this email already exists" });
    }
    const patientId = shortid.generate();
    const patient = await Patient.create({
      patientId,
      name,
      email,
      password,
    });

    createSendToken(patient, 200, req, res);

    // res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.addmedicalrecord = async (req, res) => {
  try {
    const { 
    patientid,
    fullname,
    dob,
    contact,
    medication,
    dentalhistory} = req.body;
    console.log(req.body)
    const patient = await MedicalRecords.create({
      patientid,
      fullname,
      dob,
      contact,
      medication,
      dentalhistory
    });
    res.status(201).json({record:patient})
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.adddentalchart = async (req, res)=>{
  try {
    const { 
    patientid,
    dentalChart} = req.body;
    console.log(req.body)
    const patient = await DentalCharts.create({
      patientid,
      dentalChart
    });
    res.status(201).json({record:patient})
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
exports.getdentalchart = async (req, res)=>{
  try {
   
    const charts = await DentalCharts.find();
    res.status(201).json({record:charts})
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
}
exports.getMedicalRecords = async (req, res) => {
  try {
    const patient = await MedicalRecords.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.getsinglemedicalrecord = async (req, res) => {
  try {
    const { patientid } = req.params; // Assuming patientId is passed as a parameter in the request URL
    const patient = await MedicalRecords.findOne({ patientid });
    
    if (!patient) {
      return res.status(200).json({ error: "Medical record not found" });
    }
    
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.getPatients = async (req, res) => {
  try {
    const patient = await Patient.find();
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.getMe = async (req, res) => {
  try {
    const id = req.user.id;
    const patient = await Patient.findById(id);
    if (!patient) res.status(400).json({ error: "invalid id" });
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const id = req.user.id;
    const updates = req.body;

    console.log(updates);

    // Find the patient by ID and update the fields
    const patient = await Patient.findByIdAndUpdate(
      id,
      {
        $set: {
          name: updates.name,
          email: updates.email,
          address: updates.address,
        },
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.updatePatientByAdmin = async (req, res) => {
  try {
    const updates = req.body;
    console.log(updates);
    // Find the patient by ID and update the fields
    const patient = await Patient.findByIdAndUpdate(
      req.body.PId,
      {
        $set: {
          name: updates.name,
          email: updates.email,
          password: updates.password,
          address: updates.address,
          contact:updates.contact,
          city:updates.city,
          age:updates.age,
        },
      },
      { new: true }
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.updatePatientMedicalRecord = async (req, res) => {
  try {
    const {
      patientid,
      fullname,
      dob,
      contact,
      medication,
      dentalhistory
    } = req.body;

    const updatemedical = await MedicalRecords.findOneAndUpdate(
      { patientid: patientid }, // Find by patientid field
      {
        $set: {
          fullname: fullname,
          dob: dob,
          contact: contact,
          medication: medication,
          dentalhistory: dentalhistory
        }
      },
      { new: true }
    );

    if (!updatemedical) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json(updatemedical);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByIdAndDelete(id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.updatePatientPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const patient = await Patient.findById(id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    if (patient.password !== oldPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    patient.password = newPassword;
    await patient.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.patientLogin = async (req, res) => {
  const { email, password } = req.body;
  const patient = await Patient.findOne({ email });
  if (!patient || patient.password !== password) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  createSendToken(patient, 200, req, res);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
