const MoodMaster = require("../../models/moodMaster");
const UserMood = require("../../models/userMood");
const { Op, fn, col, where } = require("sequelize");

exports.addMood = async (req, res) => {
  try {
    const { mood_id } = req.body;

    if (!mood_id) {
      return res.status(400).json({ message: "Mood ID is required!" });
    }

    const now = new Date().toLocaleString("sv-SE");

    const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

    const loggedInUser = req.user;

    const alreadyExist = await UserMood.findOne({
      where: {
        user_id: loggedInUser.userId,
        [Op.and]: [where(fn("DATE", col("created_at")), today)],
      },
    });

    if (alreadyExist) {
      return res.status(400).json({ message: "Mood already added for today" });
    }

    const userMood = UserMood.create({
      mood_id: mood_id,
      user_id: loggedInUser.userId,
      created_at: now,
    });

    return res.json({ message: "Mood saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
