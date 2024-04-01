const chatModel = require("../models/chatModel");

//create chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new chatModel({
      members: [firstId, secondId],
    });
    const response = await newChat.save();
    return res.status(201).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

//getUserChats
const getUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    return res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

//findChat
const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) return res.status(200).json(chat);
    return res.status(404).json({ message: "Chat not found..." });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: "Internal server error",
      status: "error",
      error: err.message,
    });
  }
};

module.exports = { createChat, getUserChats, findChat };
