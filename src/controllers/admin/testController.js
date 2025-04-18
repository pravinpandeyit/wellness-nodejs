const CognitiveTest = require("../../models/cognitiveTest");
const { testValidation } = require("../../validations/testValidation");

exports.addTest = async (req, res) => {
  try {
    const { error } = testValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      name,
      description,
      cognitive_test_type_id,
      cognitive_test_sub_type_id,
    } = req.body;

    const isExist = await CognitiveTest.findOne({ where: { name } });
    if (isExist) {
      return res.status(400).json({ message: "Please enter unique test name" });
    }

    const Test = await CognitiveTest.create({
      name,
      description,
      cognitive_test_type_id,
      cognitive_test_sub_type_id,
      status: 1,
    });

    return res.json({ message: "Test added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const { error } = testValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const {
      name,
      description,
      cognitive_test_type_id,
      cognitive_test_sub_type_id,
    } = req.body;

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const test = await CognitiveTest.findOne({ where: { id } });
    if (!test) {
      return res.status(400).json({ message: "Test not found" });
    }

    await test.update({
      name,
      description,
      cognitive_test_type_id,
      cognitive_test_sub_type_id,
      status: 1,
    });

    return res.json({ message: "Test updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    const test = await CognitiveTest.findByPk(id);
    if (!test) {
      return res.status(400).json({ message: "Test not found" });
    }
    await test.destroy();
    return res.json({ message: "Test deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
