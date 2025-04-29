const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TestQuestionOption = sequelize.define(
  "TestQuestionOption",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "test_quiz_questions",
        key: "id",
      },
    },
    answer: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },
    is_correct: {
      type: DataTypes.TINYINT(2),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "test_question_options",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = TestQuestionOption;
