const express = require("express");
const router = express.Router();

router.use("/task", require("./task.routes"));

module.exports = { v1Router: router };
