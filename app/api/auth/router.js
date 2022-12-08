const express = require("express");
const router = express.Router();
const { signin, signup } = require("./controller");

router.post("/auth/signin", signin);
router.post("/auth/signup", signup);

module.exports = router;
