const jwt = require("jsonwebtoken");
const { blacklist } = require("../utils/blacklist");

exports.authenticateUser = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    if (blacklist.has(token)) {
      return res
        .status(401)
        .json({ message: "Token is blacklisted. Please log in again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Error: " + error.message });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return res
      .status(403)
      .json({ message: "Access denied. Authorized Admin only!" });
  }
  next();
};

exports.isUser = (req, res, next) => {
  if (req.user.role !== 2) {
    return res
      .status(403)
      .json({ message: "Access denied. Please login first!" });
  }
  next();
};
