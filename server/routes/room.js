const router = require("express").Router();

const checkAuth = require("../middlewares/checkAuth");
const roomController = require("../controllers/room");
const { getOneRoom } = require("../controllers/room");
const cursorPagination = require("../middlewares/cursorPagination");

//new instance

router.post("/create", checkAuth, roomController.createRoom);

router.post("/join/:roomId", checkAuth, roomController.joinRoom);

router.get(
  "/all",
  cursorPagination("room", (req) => {
    const options = {
      where: {
        name: {
          contains: req.query.q,
        },
      },
    };

    return options;
  }),
  roomController.getAllRooms
);

router.get("/one/:roomId", checkAuth, getOneRoom);
router.get("/info/:roomId", roomController.getRoomInformation);

router.get("/messages/:roomId", roomController.getRoomMessages);
module.exports = router;
