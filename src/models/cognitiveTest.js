const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CognitiveTest = sequelize.define(
  "CognitiveTest",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    cognitive_test_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cognitive_test_types",
        key: "id",
      },
    },
    cognitive_test_sub_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cognitive_test_sub_types",
        key: "id",
      },
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
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
    tableName: "cognitive_tests",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = CognitiveTest;
