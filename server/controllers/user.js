const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
module.exports = {
  login: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (user && user.password === req.body.password) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          message: "authorization successfull",
          id: user.id,
          email: user.email,
          token,
        });
      } else {
        return res.status(403).json({ message: "Auth Failed" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  register: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        const createdData = await prisma.user.create({
          data: {
            email: req.body.email,
            password: req.body.password,
          },
        });
        return res.status(201).json({ message: "created", createdData });
      }

      res.status(409).json({ message: "email is used" });
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getProfile: async (req, res) => {
    try {
      const data = await prisma.userProfile.findUnique({
        where: {
          userId: Number(req.userData.id),
        },
      });

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
