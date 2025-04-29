const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { blacklist } = require("../../utils/blacklist");
const {
  registerValidation,
  loginValidation,
  changeForgetPasswordValidation,
} = require("../../validations/userValidation");

exports.register = async (req, res) => {
  try {
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { fullname, email, password, phone } = req.body;
    let user = await User.findOne({ where: { email: email, role_id: 2 } });
    if (user) {
      return res
        .status(400)
        .json({ message: "Please enter unique email address!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user = await User.create({
      fullname: fullname,
      email: email,
      password: hashPassword,
      phone: phone,
      role_id: 2,
      status: 1,
    });

    const token = jwt.sign({ userId: user.id, role: user.role_id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    return res.json({
      message: "User registered successfully",
      data: {
        fullname,
        email,
        phone,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ userId: user.id, role: user.role_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.json({
      message: "Login successful",
      data: {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const email = req.body?.email;
    if (!email) {
      return res.status(400).json({ message: "Email ID is required!" });
    }

    let user = await User.findOne({ where: { email: email, role_id: 2 } });
    if (!user) {
      return res.status(400).json({ message: "Email not registered with us" });
    }

    if (user.status == 0) {
      return res
        .status(400)
        .json({ message: "Your account has been deactivated by the admin." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);

    user.otp = otp;
    user.save();

    res.json({ message: "OTP has been sent to your email.", otp });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { error } = changeForgetPasswordValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, otp, password } = req.body;

    let user = await User.findOne({ where: { email: email, role_id: 2 } });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    if (user.otp != otp) {
      return res.status(400).json({ message: "Otp entered does not match!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    user.otp = null;
    user.save();
    return res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.logout = async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(400).json({ message: "No token provided" });

  blacklist.add(token);
  res.json({ message: "Logged out successfully" });
};

exports.getProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const user = await User.findOne({
      where: { id: loggedInUser.userId },
      attributes: ["id", "fullname", "email", "phone"],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    return res.json({ message: "User Details", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const { fullname, phone } = req.body;

    if (!fullname || !phone) {
      return res
        .status(400)
        .json({ message: "Please enter all the required fields" });
    }

    const user = await User.findOne({
      where: { id: loggedInUser.userId },
      attributes: ["id", "fullname", "email", "phone"],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    user.fullname = fullname;
    user.phone = phone;
    user.save();

    return res.json({ message: "User details updated successfully!", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
