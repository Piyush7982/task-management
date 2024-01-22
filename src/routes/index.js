const express = require("express");
const router = express.Router();
const { infoController } = require("../controller");
const { v1Router } = require("./v1");

router.use("/status", infoController.getServerStatus);
router.use("/v1", v1Router);
module.exports = router;
