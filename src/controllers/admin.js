const Admin = require("../models/admin");
const bcrypt = require("bcrypt");

// Add a new admin

exports.addAdmin = async (req, res) => {
  try {
    const {
      name,
      clinicName,
      age,
      email,
      password,
      contact,
      address,
      gender,
      qualification,
      salary,
    } = req.body;

    // Check if an admin with the same email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin object with all the information
    const newAdmin = new Admin({
      name,
      clinicName,
      age,
      email,
      password: hashedPassword,
      contact,
      address,
      gender,
      qualification,
      salary,
    });

    // Save the new admin object to the database
    const savedAdmin = await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin added successfully", admin: savedAdmin });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Find Admin

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json({ admins });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
exports.getClinicList = async (req, res) => {
  try {
    const admins = await Admin.find().select("clinicName");
    res.status(200).json({ clinics: admins });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Update an existing admin

exports.updateAdmin = async (req, res) => {
  const {
    name,
    age,
    email,
    password,
    contact,
    address,
    gender,
    qualification,
    clinicName,
    salary,
  } = req.body;
  const adminId = req.params.id;

  // Check if the admin exists
  const admin = await Admin.findById(adminId);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  // Check if the new email already exists in the database
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin && existingAdmin._id.toString() !== adminId) {
    return res.status(400).json({ message: "Email is already taken" });
  }

  // Update the admin object
  admin.name = name || admin.name;
  admin.clinicName = clinicName || admin.clinicName;
  admin.age = age || admin.age;
  admin.email = email || admin.email;
  admin.password = password || admin.password;
  admin.contact = contact || admin.contact;
  admin.address = address || admin.address;
  admin.gender = gender || admin.gender;
  admin.qualification = qualification || admin.qualification;
  admin.salary = salary || admin.salary;

  try {
    // Save the updated admin to the database
    await admin.save();
    return res.status(200).json({ message: "Admin updated successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Unable to update admin" });
  }
};

// Remove an existing admin
exports.removeAdmin = async (req, res) => {
  const adminId = req.params.id;

  try {
    // Remove the admin from the database
    await Admin.findByIdAndRemove(adminId);
    return res.status(200).json({ message: "Admin removed successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Unable to remove admin" });
  }
};

//update only password
// Update admin password
exports.updateAdminPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//admin login
// Admin login
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // Find admin by email
  const admin = await Admin.findOne({ email });

  // Check if admin exists
  if (!admin) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  // Check if password matches
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  // Generate JWT token

  createSendToken(admin, 200, req, res);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Remove password from output to prevent include in rsponse
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
