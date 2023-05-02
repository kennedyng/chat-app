const router = require("express").Router();

const checkAuth = require("../middlewares/checkAuth");
const roomController = require("../controllers/room");
const { getOneRoom } = require("../controllers/room");

//new instance

router.post("/create", checkAuth, roomController.createRoom);

router.post("/join/:roomId", checkAuth, roomController.joinRoom);

router.get("/all", roomController.getAllRooms);

router.get("/one/:roomId", checkAuth, getOneRoom);

router.get("/messages/:roomId", roomController.getRoomMessages);
module.exports = router;
