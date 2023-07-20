const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/owner");
const PasswordResetToken = require("../models/ownerpasswordreset");
const moment = require("moment-timezone");
const { sendPasswordResetEmail } = require("../Utils/email");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a password reset token
    const resetToken = Math.random().toString(36).slice(-8);

    // Get the current date and time in the Asia/Karachi timezone
    const currentTime = moment().tz("Asia/Karachi");

    console.log("Current Date and Time:", currentTime.format());

    // Calculate the expiration time by adding 15 minutes to the current time
    const expirationTime = moment(currentTime).add(15, "minutes");

    console.log("Expiration Time:", expirationTime.format());

    // Create a password reset token document
    const passwordResetToken = new PasswordResetToken({
      owner: user._id,
      token: resetToken,
      createdAt: currentTime.format(),
      expiresAt: expirationTime.format(),
    });

    await passwordResetToken.save();

    // Send the password reset email to the user
    const subject = "Password Reset Request";
    const text = `Hello, Owner!\n\nA password reset request has been initiated for your account. Please use the following token to reset your password: ${resetToken}\n\nIf you did not request this password reset, please ignore this email.\n\nBest regards,\nThe Dental Management Team`;

    // Call the sendPasswordResetEmail function from the imported module to send the email
    sendPasswordResetEmail(user.email, resetToken, subject, text);

    res.status(200).json({ message: "Password reset token sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//resetpassword
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the password reset token in the database
    const resetToken = await PasswordResetToken.findOne({ token });
    if (!resetToken) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Check if the token has expired
    const currentTime = new Date();
    const expiresAt = new Date(resetToken.expiresAt);
    if (currentTime > expiresAt) {
      return res.status(400).json({ message: "Token has expired" });
    }

    // Find the user associated with the token
    const user = await User.findById(resetToken.owner);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the password reset token
    await resetToken.deleteOne();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { email, password, username, contactInfo } = req.body;

    const userByEmail = await User.findOne({ email });
    if (userByEmail)
      return res.status(400).json({ message: "Email already exists" });

    const userByUsername = await User.findOne({ username });
    if (userByUsername)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      contactInfo,
    });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "secretKey");
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOwner = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the owner based on the provided ID
    const owner = await User.findById(id);

    if (!owner) {
      // Owner not found
      return res.status(404).json({ message: "Owner not found" });
    }

    // Return the owner data
    res.status(200).json(owner);
  } catch (error) {
    // Internal server error
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secretKey");
    res.status(200).json({ token, ownerId: user._id }); // Include the owner ID in the response
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//update owner password
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
