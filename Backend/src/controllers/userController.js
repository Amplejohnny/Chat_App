const userModel = require("../models/userModel");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/helpers");
const config = process.env;

const createToken = (_id) => {
  return jwt.sign({ _id }, config.ACCESS_TOKEN_KEY, {
    expiresIn: "3d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ msg: "Invalid email" });

    if (!validator.isStrongPassword(password))
      return res.status(400).json({ msg: "Password is weak" });

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();

    const token = createToken(user._id);
    return res.status(201).json({
      msg: "User registered successfully",
      status: "success",
      data: { _id: user._id, username, email, token },
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.status(400).json({ msg: "All fields are required" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "Invalid email or password..." });

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword)
      return res.status(401).json({ msg: "Invalid email or password..." });

    const token = createToken(user._id);
    return res.status(200).json({
      msg: "User logged in successfully",
      status: "success",
      data: { _id: user._id, username: user.username, email, token },
    });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

const getUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res
      .status(200)
      .json({ msg: "User found", status: "success", data: user });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) return res.status(404).json({ msg: "No user found" });
    return res
      .status(200)
      .json({ msg: "Users found", status: "success", data: users });
  } catch (err) {
    return res.status(500).json({
      msg: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  getUser,
  getAllUsers,
};
