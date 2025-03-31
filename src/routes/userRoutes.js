const express = require("express");
const {
  register,
  login,
  forgetPassword,
  changePassword,
  logout,
  getProfile,
  updateProfile,
} = require("../controllers/user/authController");
const {
  addJournal,
  updateJournal,
  getJournalById,
  deleteJournal,
} = require("../controllers/user/journalController");
const { authenticateUser, isUser } = require("../middleware/authMiddleware");
const Router = express.Router();

//auth routes
Router.post("/register", register);
Router.post("/login", login);
Router.post("/forget-password", forgetPassword);
Router.post("/change-password", changePassword);
Router.get("/logout", authenticateUser, logout);

//journal routes
Router.post("/journal/add", authenticateUser, isUser, addJournal);
Router.put("/journal/update/:id", authenticateUser, isUser, updateJournal);
Router.get("/journal/:id", authenticateUser, isUser, getJournalById);
Router.delete("/journal/delete/:id", authenticateUser, isUser, deleteJournal);

//profile routes
Router.get("/profile", authenticateUser, getProfile);
Router.put("/profile/update", authenticateUser, updateProfile);

module.exports = Router;
