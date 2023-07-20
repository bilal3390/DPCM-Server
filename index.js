// require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

dotenv.config({ path: "./config.env" });
app.use(cors());
// console.log(process.env.MONGODB_URI, "mongoLink*************");

mongoose.connect("mongodb://127.0.0.1:27017/dental_clinic_db").then(() => {
  console.log("Connected to mongodb");
}).catch((e) => {
  console.log("Not connected to mongodb");
})



// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Database connected successfully"))
//   .catch((err) => console.error("Error connecting to database", err));






app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to set cache-control headers
const setNoCacheHeaders = (req, res, next) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
};

app.use(setNoCacheHeaders); // Set cache-control headers for all routes

// Routes
const authRoutes = require("./src/routes/owner");
const adminRoutes = require("./src/routes/admin");
const doctorRoutes = require("./src/routes/doctor");
const patientRoutes = require("./src/routes/patient");
const pricingRoutes = require("./src/routes/pricing");
const financeRoutes = require("./src/routes/financeEntries");
const treatmentPlanRoutes = require("./src/routes/treatmentPlan");
const appointmentRoutes = require("./src/routes/appointment");

app.get("/", (req, res) => {
  res.send("This app is runinig on production");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/pricing", pricingRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/treatmentPlan", treatmentPlanRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
