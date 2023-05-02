const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//routes

const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/message");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads/profile", express.static("uploads/profile"));

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/message", messageRouter);

app.listen(process.env.PORT || port, () => {
  console.log("chat app runing on http://localhost:" + port);
});

module.exports = app;
