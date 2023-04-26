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
          userId: req.userData.id,
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

router.get("/all", async (req, res) => {
  try {
    const roomsData = await prisma.room.findMany();
    
    res.status(200).json(roomsData);
  } catch (error) {
    res.status(200).json(error);
  }
});
module.exports = router;
