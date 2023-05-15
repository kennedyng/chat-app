const checkAuth = require("../middlewares/checkAuth");
const { categoriesByDate } = require("../utils/categoriesByDate");
const prisma = require("../utils/prisma");
const moment = require("moment");
const router = require("express").Router();

router.post("/create", checkAuth, async (req, res) => {
  try {
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

    const groupedData = categoriesByDate(data);

    console.log(groupedData);
    res.status(200).json(groupedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
