const express = require("express");
const http = require("http");
const app = express();
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();


const Port = process.env.PORT
app.use(cors());
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