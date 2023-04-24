const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const app = express();
const port = 3000;

//routes

const userRouter = require("./routes/user");
const roomRouter = require("./routes/room");
const messageRouter = require("./routes/user");

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads/logo", express.static("uploads/logo"));

app.use(cors());

app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/message", userRouter);

app.listen(port, () => {
  console.log("chat app runing on http://localhost:" + port);
});
