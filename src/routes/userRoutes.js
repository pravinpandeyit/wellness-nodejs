const express = require("express");
const {
  register,
  login,
  forgetPassword,
  changePassword,
  logout,
} = require("../controllers/user/authController");
const { addJournal, updateJournal, getJournalById, deleteJournal } = require("../controllers/user/journalController");
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
Router.put("/journal/update/:id", authenticateUser, updateJournal);
Router.get("/journal/:id", authenticateUser, getJournalById);
Router.delete("/journal/delete/:id", authenticateUser, deleteJournal);





module.exports = Router;
