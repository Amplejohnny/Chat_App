const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  getUser,
  getAllUsers,
} = require("../controllers/userController");

router.post("/signup", registerUser);
router.post("/login", userLogin);
router.get("/find/:userId", getUser);
router.get("/users", getAllUsers);
 
module.exports = router; 
