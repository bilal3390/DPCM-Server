const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Admin = require("../models/admin");
const Patient = require("../models/patient");

// const dotenv = require('dotenv');

// dotenv.config();

const protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
        })
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await Admin.findById(decoded.id);
    console.log(currentUser);
    if (!currentUser)
      return next(
        res.status(401).json({
          message: "The user belonging to this token does no longer exist.",
        })
      );

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    return next(
      res.status(401).json({
        message: error,
      })
    );
  }
};
const patientProtect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        res.status(401).json({
          message: "You are not logged in! Please log in to get access.",
        })
      );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    console.log(decoded);

    // 3) Check if user still exists
    const currentUser = await Patient.findById(decoded.id);
    console.log(currentUser);
    if (!currentUser)
      return next(
        res.status(401).json({
          message: "The user belonging to this token does no longer exist.",
        })
      );

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    return next(
      res.status(401).json({
        message: error,
      })
    );
  }
};

module.exports = { protect, patientProtect };
