const { Sequelize } = require("sequelize");
const User = require("../../models/User");

exports.getUserList = async (req, res) => {
  try {
    const { search } = req.query;

    const whereConditions = {
      role_id: 2,
    };

    if (search) {
      whereConditions[Sequelize.Op.or] = [
        { fullname: { [Sequelize.Op.like]: `%${search}%` } },
        { email: { [Sequelize.Op.like]: `%${search}%` } },
      ];
    }

    const users = await User.findAll({
      where: whereConditions,
      attributes: ["id", "fullname", "email", "phone"],
    });

    return res.json({ message: "User List", data: users });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await User.findOne({
      where: { id },
      attributes: ["id", "fullname", "email", "phone"],
    });
    return res.json({ message: "User Details", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};
