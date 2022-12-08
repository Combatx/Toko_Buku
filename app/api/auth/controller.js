const { User } = require("../../db/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUser = await User.findOne({ where: { email: email } });

    if (checkUser) {
      const checkPassword = bcrypt.compareSync(password, checkUser.password);

      if (checkPassword) {
        const koderahasia = process.env.JWT_SECRET;
        const token = jwt.sign(
          {
            user: {
              id: checkUser.id,
              name: checkUser.name,
              email: checkUser.email,
            },
          },
          koderahasia
        );
        res.status(200).json({ message: "Success Signin", data: token });
      } else {
        res.status(403).json({ message: "Email or password is wrong" });
      }
    } else {
      res.status(403).json({ message: "Email or password is wrong" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res
        .status(403)
        .json({ message: "Password and Confrim Password don't match" });
    }

    const checkEmail = await User.findOne({ where: { email: email } });

    if (checkEmail) {
      return res.status(403).json({ message: "Email already registered" });
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: "admin",
    });

    delete user.dataValues.password;

    res.status(201).json({
      message: "Account success register",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signin,
  signup,
};
