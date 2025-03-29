const express = require("express");
const {
  register,
  login,
  forgetPassword,
  changePassword,
  logout,
} = require("../controllers/user/authController");
const { addJournal } = require("../controllers/user/journalController");
const { authenticateUser } = require("../middleware/authMiddleware");
const Router = express.Router();

//auth routes
Router.post("/register", register);
Router.post("/login", login);
Router.post("/forget-password", forgetPassword);
Router.post("/change-password", changePassword);
Router.get("/logout", authenticateUser, logout);

//journal routes
Router.post("/journal/add", authenticateUser, addJournal);

module.exports = Router;
