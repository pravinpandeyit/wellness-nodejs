const TestQuiz = require("../../models/testQuiz");
const TestQuizQuestion = require("../../models/testQuizQuestion");
const TestQuestionOption = require("../../models/testQuestionOption");
const { quizValidation } = require("../../validations/quizValidation");
const sequelize = require("../../config/database");

exports.addQuiz = async (req, res) => {
  const t = await sequelize.transaction(); //start a transaction
  try {
    const { error } = quizValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { cognitive_test_id, title, passing, questions } = req.body;

    const existingQuiz = await TestQuiz.findOne({ where: { title: title } });
    if (existingQuiz) {
      return res.status(400).json({ message: "Please enter unique title!" });
    }

    const newQuiz = await TestQuiz.create(
      {
        cognitive_test_id: cognitive_test_id,
        title: title,
        passing: passing,
      },
      { transaction: t }
    );

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      const createdQuestion = await TestQuizQuestion.create(
        {
          quiz_id: newQuiz.id,
          title: question.title,
          description: question.description,
          marks: question.marks,
        },
        { transaction: t }
      );

      const optionToCreate = question.options.map((option) => ({
        question_id: createdQuestion.id,
        answer: option.answer,
        is_correct: option.is_correct ? 1 : 0,
      }));

      await TestQuestionOption.bulkCreate(optionToCreate, { transaction: t });
    }

    await t.commit();

    return res.json({ message: "Quiz added successfully" });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ message: "Error: " + error.message });
  }
};
