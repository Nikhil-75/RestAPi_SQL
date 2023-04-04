const userData = require("../models/userModel");
const bcrypt = require("bcrypt");

const salt = 10;

exports.userRegister = async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = new userData({
      userName,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const data = await user.save();
    res.status(200).json({
      message: "user registered successfully",
      user_id: data.dataValues.id,
    });
  } catch (error) {
    res.status(400).json({ message: "data is not correct" });
  }
};

exports.Login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await userData.findOne({ where: { userName } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({
        user_id: user.dataValues.id,
        message: "user login successfully",
      });
    }
  } catch (error) {
    res.status(400).json({ message: "user not found correct" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const id = req.headers.user_id;
    //  const user  = await userData.findOne({where:{id}});
    const user = await userData.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });

    //.findAll({
    //attributes: {exclude: ['password']},
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ message: "user not get" });
  }
};

exports.userDelete = async (req, res) => {
  try {
    const id = req.headers.user_id;
    const user = await userData.destroy({ where: { id } });
    res.status(200).json({ message: "user delete successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUser = async (req, res) => {
  const id = req.headers.user_id;

  try {
    //const user = await userData.findMany().limit(id)
    const user = await userData.findAndCountAll({ limit: 3 });
    return res.status(200).json({ user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
