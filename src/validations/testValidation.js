const Joi = require("joi");

const testValidation = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().required(),
  cognitive_test_type_id: Joi.number().integer().required(),
  cognitive_test_sub_type_id: Joi.number().integer().required(),
});

module.exports = { testValidation };
