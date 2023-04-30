const checkAuth = require("../middlewares/checkAuth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const router = require("express").Router();

router.post("/create", checkAuth, async (req, res) => {
  try {
    console.log("creating a message", req.body);
    const data = await prisma.message.create({
      data: {
        roomId: Number(req.body.roomId),
        userId: Number(req.userData.id),
        message: req.body.message,
      },
    });

    return res.status(201).json({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/messages/:roomId", async (req, res) => {
  try {
    const data = await prisma.message.findMany({
      where: {
        roomId: Number(req.params.roomId),
      },
      include: {
        User: {
          select: {
            profile: true,
          },
        },
      },
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
