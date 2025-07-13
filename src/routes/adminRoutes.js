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
const {
  addTest,
  updateTest,
  deleteTest,
} = require("../controllers/admin/testController");
const {
  addQuiz,
  addQuestion,
  updateQuiz,
  updateQuestion,
  deleteQuestion,
  deleteQuiz,
  addOption,
  updateOption
} = require("../controllers/admin/quizController");
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
Router.get("/category-list", authenticateUser, isAdmin, getAllCategory);

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

//test routes
Router.post("/test/add", authenticateUser, isAdmin, addTest);
Router.put("/test/update/:id", authenticateUser, isAdmin, updateTest);
Router.delete("/test/delete/:id", authenticateUser, isAdmin, deleteTest);

//quiz routes
Router.post("/quiz/add", authenticateUser, isAdmin, addQuiz);
Router.post("/quiz/question/add", authenticateUser, isAdmin, addQuestion);
Router.put("/quiz/update/:id", authenticateUser, isAdmin, updateQuiz);
Router.put(
  "/quiz/question/update/:id",
  authenticateUser,
  isAdmin,
  updateQuestion
);
Router.delete(
  "/quiz/question/delete/:id",
  authenticateUser,
  isAdmin,
  deleteQuestion
);
Router.delete("/quiz/delete/:id", authenticateUser, isAdmin, deleteQuiz);
Router.post("/quiz/question/option/add/:questionId", authenticateUser, isAdmin, addOption);
Router.put("/quiz/question/option/update/:id", authenticateUser, isAdmin, updateOption);

module.exports = Router;
