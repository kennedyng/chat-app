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
    origin: "http://127.0.0.1:5173",
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

let activeUsers = new Set();

io.on("connection", (socket) => {
  socket.on("USER_ONLINE", ({ userId }) => {
    activeUsers.add(userId);

    console.log(Array.from(activeUsers));
  });

  io.emit("ACTIVE_USERS", { id: [...activeUsers] });
});

server.listen(process.env.PORT || port, () => {
  console.log("chat app runing on http://localhost:" + port);
});

module.exports = server;
