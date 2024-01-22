const express = require("express");
const router = express.Router();

router.use("/task", require("./task.routes"));
router.use("/user", require("./user.routes"));

module.exports = { v1Router: router };
