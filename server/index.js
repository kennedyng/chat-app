const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const http = require("http");

const { Server } = require("socket.io");
const port = 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://127.0.0.1:5173",
      "https://chat-app-production-ba2b.up.railway.app",
      "https://chat-app-baff.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/message");

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads/profile", express.static("uploads/profile"));
app.use(cors());

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/message", messageRouter);

const users = {};

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("USER_ONLINE", (userId) => {
    users[socket.id] = userId;

    io.emit("ACTIVE_USERS", users);
  });

  socket.on("USER_OFFLINE", (userId) => {
    delete users[socket.id];

    io.emit("ACTIVE_USERS", users);
  });

  socket.on("JOIN_CHANNEL", (channelId) => {
    socket.join(channelId);
  });

  socket.on("LEAVE_CHANNEL", (channelId) => {
    socket.leave(channelId);
  });

  socket.on("SEND_GROUP_MESSAGE", (data) => {
    io.in(data.roomId).emit("RECEIVE_GROUP_MESSAGE", data);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

server.listen(process.env.PORT || port, () => {
  console.log("chat app runing on http://localhost:" + port);
});

module.exports = server;
