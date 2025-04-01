const express = require("express");
const {
  getUserList,
  getUserDetails,
} = require("../controllers/admin/adminController");
const { addCategory, updateCategory } = require("../controllers/admin/categoryController");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");

const Router = express.Router();

//user route
Router.get("/user-list", authenticateUser, isAdmin, getUserList);
Router.get("/user/details/:id", authenticateUser, isAdmin, getUserDetails);

//category route
Router.post("/category/add", authenticateUser, isAdmin, addCategory);
Router.put("/category/update/:id", authenticateUser, isAdmin, updateCategory);

module.exports = Router;
