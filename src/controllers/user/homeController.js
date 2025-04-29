const MoodMaster = require("../../models/moodMaster");
const UserMood = require("../../models/userMood");

exports.home = async (req, res) => {
  try {
    const mood = await MoodMaster.findAll({
      where: { status: 1 },
      attributes: ["id", "name", "code", "logo"],
    });

    const loggedInUser = req.user;
    const now = new Date();

    const isExist = await UserMood.findOne({
      where: { user_id: loggedInUser.userId, created_at: now },
    });
    const todayMood = isExist ? true : false;

    res.json({ message: "Home Details", data: { mood, todayMood } });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
