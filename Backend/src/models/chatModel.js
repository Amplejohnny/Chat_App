const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const chatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

const chatModel = model("Chat", chatSchema);
module.exports = chatModel;
