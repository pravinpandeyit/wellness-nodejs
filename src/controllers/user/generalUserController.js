// const CognitiveTestType = require("../../models/cognitiveTestType");
// const CognitiveTestSubType = require("../../models/cognitiveTestSubType");
const { CognitiveTestType, CognitiveTestSubType } = require("../../models");

exports.getCategoriesWithSubcategories = async (req, res) => {
  try {
    const categories = await CognitiveTestType.findAll({
      include: [
        {
          model: CognitiveTestSubType,
          as: "subcategories",
          required: false,
          attributes: ["id", "parent_id", "sub_type", "status"],
        },
      ],
      attributes: ["id", "type", "image", "status"],
    });
    res.status(400).json({ message: "Category Details!", data: categories });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
