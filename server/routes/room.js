const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const checkAuth = require("../middlewares/checkAuth");

const prisma = new PrismaClient();

router.post("/create", checkAuth, async (req, res) => {
  try {
    const room = await prisma.room.findUnique({
      where: {
        name: req.body.name,
      },
    });

    if (!room) {
      const createdData = await prisma.room.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          userId: Number(req.userData.id),
        },
      });

      return res.status(201).json({ message: "created", createdData });
    }
    {
      return res.status(409).json({ message: "room name already taken" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/join/:roomId", checkAuth, async (req, res) => {
  try {
    const joinedRooms = await prisma.usersJoinedRoom.findMany({
      where: {
        userId: Number(req.userData.id),
        roomId: Number(req.params.roomId),
      },
    });

    if (joinedRooms.length > 0) {
      return res
        .status(201)
        .json({ message: "Welcome back To the Room", data: joinedRooms });
    }

    const joinRoomData = await prisma.usersJoinedRoom.create({
      data: {
        userId: Number(req.userData.id),
        roomId: Number(req.params.roomId),
      },
    });

    res.status(201).json({ message: "Joined successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const roomsData = await prisma.room.findMany();

    res.status(200).json(roomsData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/one/:roomId", checkAuth, async (req, res) => {
  try {
    const members = await prisma.usersJoinedRoom.findMany({
      where: {
        roomId: Number(req.params.roomId),
      },

      include: {
        User: {
          include: {
            profile: true,
          },
        },
      },
    });

    const roomData = await prisma.usersJoinedRoom.findFirst({
      where: {
        roomId: Number(req.params.roomId),
        id: Number(req.userData.id),
      },
      include: {
        Room: {
          include: {
            messages: true,
          },
        },
        User: true,
      },
    });

    res.status(200).json({ ...roomData, members });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
