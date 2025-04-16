const MoodMaster = require("../../models/moodMaster");

exports.home = async (req, res) => {
  try {
    
    res.send("home api..");
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
