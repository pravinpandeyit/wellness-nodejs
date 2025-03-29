const Joi = require("joi");

const registerValidation = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character (@$!%*?&).",
    }),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Password confirmation must match password." }),
  phone: Joi.string().required(),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const changeForgetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string()
    .length(4)
    .pattern(/^\d{4}$/)
    .required()
    .messages({
      "string.length": "OTP must be exactly 4 digits.",
      "string.pattern.base": "OTP must contain only numeric digits (0-9).",
    }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character (@$!%*?&).",
    }),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Password confirmation must match password." }),
});

module.exports = {
  registerValidation,
  loginValidation,
  changeForgetPasswordValidation,
};
