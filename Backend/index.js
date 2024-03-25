const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const connectDB = require("./src/config/database");
const userRoute = require("./src/routes/userRoute");
const dotenv = require("dotenv");
dotenv.config();

connectDB();

const Port = process.env.PORT
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoute);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
        // console.log(data);
        // io.emit("message", data);
    });
});


server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});