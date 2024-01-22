const express = require("express");
const router = express.Router();
const { infoController } = require("../controller");

router.use("/status", infoController.getServerStatus);

module.exports = router;
