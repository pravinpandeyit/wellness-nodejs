const express = require("express");
const {
  register,
  login,
  forgetPassword,
  changePassword,
} = require("../controllers/user/authController");

const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.post("/forget-password", forgetPassword);
Router.post("/change-password", changePassword);

module.exports = Router;
