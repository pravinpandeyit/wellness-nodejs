const CognitiveTestType = require("../../models/cognitiveTestType");
const CognitiveTestSubType = require("../../models/cognitiveTestSubType");

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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    const category = await CognitiveTestType.findOne({ where: { id } });

    if (!category) {
      return res.status(400).json({ message: "Category not found!" });
    }

    category.destroy();
    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const { category_id, title } = req.body;
    if (!category_id || !title) {
      return res
        .status(400)
        .json({ message: "Please enter the required fields" });
    }

    let subCategory = await CognitiveTestSubType.findOne({
      where: { sub_type: title },
    });
    if (subCategory) {
      return res
        .status(400)
        .json({ message: "Please enter unique subcategory title!" });
    }

    subCategory = await CognitiveTestSubType.create({
      parent_id: category_id,
      sub_type: title,
      status: 1,
      created_at: Date.now(),
    });

    return res.json({ message: "Sub category added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const { category_id, title } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    if (!category_id || !title) {
      return res
        .status(400)
        .json({ message: "Please enter the required fields" });
    }

    let subCategory = await CognitiveTestSubType.findOne({
      where: { id },
    });
    if (!subCategory) {
      return res.status(400).json({ message: "Sub category not found!" });
    }

    subCategory.parent_id = category_id;
    subCategory.sub_type = title;
    await subCategory.save();

    return res.json({ message: "Sub category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    let subCategory = await CognitiveTestSubType.findOne({
      where: { id },
    });
    if (!subCategory) {
      return res.status(400).json({ message: "Sub category not found!" });
    }

    subCategory.destroy();

    return res.json({ message: "Sub category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
