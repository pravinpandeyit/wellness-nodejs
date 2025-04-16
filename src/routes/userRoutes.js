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
  journalList,
} = require("../controllers/user/journalController");
const { home } = require("../controllers/user/homeController");
const {
  getCategoriesWithSubcategories,
} = require("../controllers/user/generalUserController");
const { authenticateUser, isUser } = require("../middleware/authMiddleware");
const Router = express.Router();

//auth routes
Router.post("/register", register);
Router.post("/login", login);
Router.post("/forget-password", forgetPassword);
Router.post("/change-password", changePassword);
Router.get("/logout", authenticateUser, logout);

//home routes
Router.get("/home", authenticateUser, isUser, home);

//journal routes
Router.post("/journal/add", authenticateUser, isUser, addJournal);
Router.put("/journal/update/:id", authenticateUser, isUser, updateJournal);
Router.get("/journal/:id", authenticateUser, isUser, getJournalById);
Router.delete("/journal/delete/:id", authenticateUser, isUser, deleteJournal);
Router.get("/journal-list", authenticateUser, isUser, journalList);

//profile routes
Router.get("/profile", authenticateUser, getProfile);
Router.put("/profile/update", authenticateUser, updateProfile);

//general routes
Router.get(
  "/categories-with-subcategories",
  authenticateUser,
  getCategoriesWithSubcategories
);

module.exports = Router;
