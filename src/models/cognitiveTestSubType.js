const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CognitiveTestSubType = sequelize.define(
  "CognitiveTestSubType",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "cognitive_test_types",
        key: "id",
      },
    },
    sub_type: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
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
    tableName: "cognitive_test_sub_types",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = CognitiveTestSubType;
