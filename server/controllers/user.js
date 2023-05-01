const jwt = require("jsonwebtoken");
const prisma = require("../utils/prisma");
module.exports = {
  login: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },

        include: {
          profile: true,
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
          profileCompleted: user?.profile?.name ? true : false,
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

  editProfile: async (req, res) => {
    try {
      console.log(req.body);
      const data = await prisma.userProfile.update({
        where: {
          userId: Number(req.userData.id),
        },
        data: {
          name: req.body.name,
        },
      });

      return res
        .status(201)
        .json({ data, message: "profile created successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  createProfilePic: async (req, res) => {
    try {
      if (req.file) {
        const data = await prisma.userProfile.update({
          where: {
            userId: Number(req.userData.id),
          },
          data: {
            img_url: req.file.path,
          },
        });

        return res.status(201).json({ message: "created" });
      }
      return res.status(404).json({ message: "file not defined" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },
};
