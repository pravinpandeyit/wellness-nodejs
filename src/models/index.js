const Journal = require("./Journal");
const Tag = require("./Tag");
const User = require("./User");
const CognitiveTestType = require("./cognitiveTestType");
const CognitiveTestSubType = require("./cognitiveTestSubType");

Journal.belongsToMany(Tag, {
  through: "journal_tags",
  foreignKey: "journal_id",
});
Tag.belongsToMany(Journal, { through: "journal_tags", foreignKey: "tag_id" });

Journal.belongsTo(User, { foreignKey: "user_id" });

CognitiveTestType.hasMany(CognitiveTestSubType, {
  foreignKey: "parent_id",
  as: "subcategories", 
});

CognitiveTestSubType.belongsTo(CognitiveTestType, {
  foreignKey: "parent_id",
  as: "category",
});

module.exports = {
  Journal,
  Tag,
  User,
  CognitiveTestType,
  CognitiveTestSubType,
};
