const express = require("express");
const {
  getUserList,
  getUserDetails,
} = require("../controllers/admin/adminController");
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/admin/categoryController");
const { authenticateUser, isAdmin } = require("../middleware/authMiddleware");

const Router = express.Router();

//user routes
Router.get("/user-list", authenticateUser, isAdmin, getUserList);
Router.get("/user/details/:id", authenticateUser, isAdmin, getUserDetails);

//category routes
Router.post("/category/add", authenticateUser, isAdmin, addCategory);
Router.put("/category/update/:id", authenticateUser, isAdmin, updateCategory);
Router.delete(
  "/category/delete/:id",
  authenticateUser,
  isAdmin,
  deleteCategory
);
Router.post("/category-list", authenticateUser, isAdmin, getAllCategory);


//subcategory routes
Router.post("/sub-category/add", authenticateUser, isAdmin, addSubCategory);
Router.put(
  "/sub-category/update/:id",
  authenticateUser,
  isAdmin,
  updateSubCategory
);
Router.delete(
  "/sub-category/delete/:id",
  authenticateUser,
  isAdmin,
  deleteSubCategory
);

module.exports = Router;
