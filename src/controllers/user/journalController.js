const Journal = require("../../models/Journal");
const { journalValidation } = require("../../validations/journalValidation");

exports.addJournal = async (req, res) => {
  try {
    const { error } = journalValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, notes } = req.body;
    const loggedInUser = req.user;

    let journal = await Journal.findOne({
      where: { title, user_id: loggedInUser.userId },
    });
    if (journal) {
      return res
        .status(400)
        .json({ message: "Enter unique title for journal" });
    }

    journal = await Journal.create({
      title,
      notes,
      user_id: loggedInUser.userId,
    });

    return res.json({ message: "Journal added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
