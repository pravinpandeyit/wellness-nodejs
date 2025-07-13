const TestQuiz = require("../../models/testQuiz");
const TestQuizQuestion = require("../../models/testQuizQuestion");
const TestQuestionOption = require("../../models/testQuestionOption");
const {
  quizValidation,
  questionValidation,
  optionValidation,
} = require("../../validations/quizValidation");
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

exports.addQuestion = async (req, res) => {
  try {
    const { error } = questionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { quiz_id, questions } = req.body;
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];

      const createdQuestion = await TestQuizQuestion.create({
        quiz_id: quiz_id,
        title: question.title,
        description: question.description,
        marks: question.marks,
      });

      const optionToCreate = question.options.map((option) => ({
        question_id: createdQuestion.id,
        answer: option.answer,
        is_correct: option.is_correct ? 1 : 0,
      }));

      await TestQuestionOption.bulkCreate(optionToCreate);
    }

    return res.json({ message: "Question added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { title, passing } = req.body;
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    if (!title && !passing) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields!" });
    }

    let quiz = await TestQuiz.findByPk(id);

    if (!quiz) {
      return res.status(400).json({ message: "Quiz not found!" });
    }

    quiz.title = title;
    quiz.passing = passing;
    await quiz.save();

    return res.json({ message: "Quiz updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const { title, description, marks } = req.body;
    if (!title && !description && !marks) {
      return res
        .status(400)
        .json({ message: "Please fill all the required details" });
    }

    const question = await TestQuizQuestion.findByPk(id);
    question.title = title;
    question.description = description;
    question.marks = marks;
    await question.save();

    return res.json({ message: "Question updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const question = await TestQuizQuestion.findByPk(id);
    if (!question) {
      return res.status(400).json({ message: "Question not found!" });
    }

    await TestQuestionOption.destroy({ where: { question_id: id } });
    await TestQuizQuestion.destroy({ where: { id } });

    return res.json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const quiz = await TestQuiz.findOne({ where: { id } });
    if (!quiz) {
      return res.status(400).json({ message: "Quiz not found!" });
    }

    const questions = await TestQuizQuestion.findAll({
      where: { quiz_id: id },
    });

    for (const question of questions) {
      await TestQuestionOption.destroy({ where: { question_id: question.id } });
      await question.destroy();
    }

    await quiz.destroy();
    return res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.addOption = async (req, res) => {
  try {
    const { error } = optionValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { questionId } = req.params;
    if (!questionId) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const question = await TestQuizQuestion.findByPk(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found!" });
    }

    const options = req.body;

    // if the new options is true, so firstly make the existing options false in db then add new options
    const correctCount = options.filter(
      (opt) => opt.is_correct === true
    ).length;

    if (correctCount > 0) {
      await TestQuestionOption.update(
        { is_correct: 0 },
        { where: { question_id: questionId } }
      );
    }

    const optionWithQuestionId = options.map((option) => ({
      question_id: questionId,
      answer: option.answer,
      is_correct: option.is_correct ? 1 : 0,
    }));

    await TestQuestionOption.bulkCreate(optionWithQuestionId);

    return res.json({ message: "Options added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateOption = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const { answer } = req.body;

    let option = await TestQuestionOption.findByPk(id);
    if (!option) {
      return res.status(400).json({ message: "Option not found!" });
    }

    option.answer = answer;
    option.save();
    return res.json({ message: "Option updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
