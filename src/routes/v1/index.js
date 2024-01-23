const express = require("express");
const router = express.Router();

router.use("/task", require("./task.routes"));
router.use("/user", require("./user.routes"));
router.use("/admin", require("./admin.routes"));

module.exports = { v1Router: router };
