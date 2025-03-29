const Joi = require("joi");

journalValidation = Joi.object({
  title: Joi.string().min(5).required(),
  notes: Joi.string().required(),
});

module.exports = { journalValidation };
