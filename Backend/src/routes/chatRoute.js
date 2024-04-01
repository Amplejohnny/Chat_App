const express = require("express");
const router = express.Router();
const {
  createChat,
  getUserChats,
  findChat,
} = require("../controllers/chatController");

router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/find/:firstId/:secondId", findChat);

module.exports = router;