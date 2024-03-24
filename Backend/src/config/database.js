const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const URI = process.env.ATLAS_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Successfully connected to the MongoDB database");
  } catch (error) {
    console.error("MongoDB database connection failed..." , error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
