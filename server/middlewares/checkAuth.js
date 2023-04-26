const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decodedData = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_KEY
    );
    req.userData = decodedData;
    console.log(req.userData);

    next();
  } catch (error) {
    res.status(403).json({ message: "authorization failed" });
  }
};
