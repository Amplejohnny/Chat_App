const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  findUser,
  findAllUsers,
} = require("../controllers/userController");

router.post("/signup", registerUser);
router.post("/login", userLogin);
router.get("/find/:userId", findUser);
router.get("/find", findAllUsers);

module.exports = router;
