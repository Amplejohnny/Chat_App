const messageModel = require("../models/messageModel");

//createMessage
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;
  const newMessage = new messageModel({ chatId, senderId, text });
  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

//getMessages
const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

module.exports = { createMessage, getMessages };
