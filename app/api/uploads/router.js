const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const { uploadImage } = require("./controller");
const upload = require("../../middlewares/multer");

router.post("/uploads", upload.single("images"), auth, uploadImage);

module.exports = router;
