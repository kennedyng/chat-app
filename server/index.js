const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//routes

const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/message");

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads/profile", express.static("uploads/profile"));

app.use(cors());

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/message", messageRouter);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

server.listen(process.env.PORT || port, () => {
  console.log("chat app runing on http://localhost:" + port);
});

module.exports = server;
