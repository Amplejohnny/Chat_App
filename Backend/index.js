const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");

const connectDB = require("./src/config/database");
const userRoute = require("./src/routes/userRoute");
const chatRoute = require("./src/routes/chatRoute");
const messageRoute = require("./src/routes/messageRoute");
const dotenv = require("dotenv");
dotenv.config();
connectDB();

const Port = process.env.PORT;

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

app.use("/api/auth", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

server.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
