const CognitiveTestType = require("../../models/cognitiveTestType");

exports.addCategory = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required!" });
    }

    let category = await CognitiveTestType.findOne({ where: { type: title } });

    if (category) {
      return res.status(400).json({ message: "Please enter unique title!" });
    }
    category = await CognitiveTestType.create({
      type: title,
      image: null,
      status: 1,
    });

    return res.json({ message: "Category added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;

    if (!title) {
      return res.status(400).json({ message: "Title is required!" });
    }

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    let category = await CognitiveTestType.findOne({ where: { id } });

    if (!category) {
      return res.status(400).json({ message: "Category not found" });
    }

    category.type = title;
    await category.save();
    return res.json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
