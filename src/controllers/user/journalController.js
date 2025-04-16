const { Op } = require("sequelize");
const { Journal, Tag, User } = require("../../models");
const { journalValidation } = require("../../validations/journalValidation");

exports.addJournal = async (req, res) => {
  try {
    const { error } = journalValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { title, notes, tags } = req.body;
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

    if (Array.isArray(tags) && tags.length > 0) {
      const tagInstances = await Promise.all(
        tags.map(async (tagName) => {
          const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
          return tag;
        })
      );
      await journal.addTags(tagInstances);
    }

    return res.json({ message: "Journal added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.updateJournal = async (req, res) => {
  try {
    const { error } = journalValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { id } = req.params;
    const { title, notes, tags } = req.body;
    const loggedInUser = req.user;

    let journal = await Journal.findOne({
      where: { id, user_id: loggedInUser.userId },
    });

    if (!journal) {
      return res.status(400).json({ message: "Journal not found" });
    }

    journal.title = title;
    journal.notes = notes;
    await journal.save();

    if (Array.isArray(tags) && tags.length > 0) {
      const tagInstances = await Promise.all(
        tags.map(async (tagName) => {
          const [tag] = await Tag.findOrCreate({ where: { name: tagName } });
          return tag;
        })
      );
      await journal.setTags(tagInstances);
    }

    return res.json({ message: "Journal updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.getJournalById = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await Journal.findOne({
      where: { id },
      attributes: ["id", "title", "notes"],
      include: [
        {
          model: User,
          attributes: ["id", "fullname"],
        },
        {
          model: Tag,
          attributes: ["id", "name", "status"],
          through: { attributes: [] },
        },
      ],
    });

    if (!journal) {
      return res.status(400).json({ message: "Journal not found!" });
    }

    return res.json({ message: "Journal details", journal });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.deleteJournal = async (req, res) => {
  try {
    const { id } = req.params;
    const journal = await Journal.findOne({ where: { id } });
    if (!journal) {
      return res.status(400).json({ message: "Journal not found!" });
    }

    await journal.setTags([]);
    await journal.destroy();
    return res.json({ message: "Journal deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.journalList = async (req, res) => {
  try {
    const { title } = req.query;

    const whereCondition = { status: 1 };

    if (title) {
      whereCondition.title = {
        [Op.like]: `%${title}%`,
      };
    }

    const journals = await Journal.findAll({
      where: whereCondition,
      attributes: ["id", "title", "notes"],
      include: [
        {
          model: Tag,
          attributes: ["id", "name", "status"],
          through: { attributes: [] },
        },
      ],
      order: [["created_at", "DESC"]],
    });
    return res.json({ message: "Journal List", journals });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
