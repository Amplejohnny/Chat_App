const { Server } = require("socket.io");
const io = new Server({
  cors: "http://localhost:5173",
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ socketId: socket.id, userId });
    console.log("onlineUsers", onlineUsers);

    io.emit("getOnlineUsers", onlineUsers);
  });

  //add message
  socket.on("sendMessage", (message) => {
    const recipient = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (recipient) {
      io.to(recipient.socketId).emit("getMessage", message);
    }
  });

  //show user is offline
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(8000);
