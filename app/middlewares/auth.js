const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (req, res, next) => {
  try {
    const token = req.headers.token;
    const koderahasia = process.env.JWT_SECRET;
    const decode = jwt.verify(token, koderahasia);

    if (decode) {
      req.user = decode.user;
      next();
    }
  } catch (error) {
    res.status(401).json({
      message: "Ivalid token",
    });
  }
};

module.exports = {
  auth,
};
