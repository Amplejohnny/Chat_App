const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const messageSchema = new Schema({
    chatId: String,
    senderId: String,
    text: String,
},
{
    timestamps: true
});

const messageModel = model('Message', messageSchema);
module.exports = messageModel;