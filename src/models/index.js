const Journal = require("./Journal");
const Tag = require("./Tag");
const User = require("./User");

Journal.belongsToMany(Tag, { through: "journal_tags", foreignKey: "journal_id" });
Tag.belongsToMany(Journal, { through: "journal_tags", foreignKey: "tag_id" });

Journal.belongsTo(User, { foreignKey: "user_id" });
// User.hasMany(Journal, { foreignKey: "user_id" }); 

module.exports = { Journal, Tag, User };
