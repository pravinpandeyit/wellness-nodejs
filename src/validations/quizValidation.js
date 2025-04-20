const Joi = require("joi");

const quizValidation = Joi.object({
  cognitive_test_id: Joi.number().integer().required(),
  title: Joi.string().min(5).required(),
  passing: Joi.number().integer().min(0).max(100).required(),

  questions: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().min(3).required(),
        description: Joi.string().allow("", null),
        marks: Joi.number().integer().min(1).required(),

        options: Joi.array()
          .items(
            Joi.object({
              answer: Joi.string().min(1).required(),
              is_correct: Joi.boolean().required(),
            })
          )
          .min(2)
          .required(), // At least 2 options per question
      })
    )
    .min(1)
    .required(), // At least 1 question
});

module.exports = { quizValidation };
