const Joi = require("joi");

journalValidation = Joi.object({
  title: Joi.string().min(5).required(),
  notes: Joi.string().required(),
  tags: Joi.array().required()
});

module.exports = { journalValidation };
