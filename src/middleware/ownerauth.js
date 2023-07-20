const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv');

// dotenv.config();

const ownerAuthMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header("authorization");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded data to the request object
    req.owner = decoded.owner;

    // Call the next middleware
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = ownerAuthMiddleware;
