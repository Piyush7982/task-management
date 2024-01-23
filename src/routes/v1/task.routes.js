const express = require("express");
const router = express.Router();
const { taskController } = require("../../controller");
const { userMiddleware } = require("../../middleware");

router.post(
  "/",
  userMiddleware.authenticationMiddleware,
  taskController.createTask
);
router.get(
  "/:id",
  userMiddleware.authenticationMiddleware,
  taskController.getTaskById
);
router.put(
  "/:id",
  userMiddleware.authenticationMiddleware,
  taskController.updateTask
);
router.delete(
  "/:id",
  userMiddleware.authenticationMiddleware,
  taskController.deleteTask
);

module.exports = router;
