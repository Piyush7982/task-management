const express = require("express");
const router = express.Router();
const { taskController } = require("../../controller");
const { userMiddleware, taskMiddleware } = require("../../middleware");

router.post(
  "/",
  userMiddleware.authenticationMiddleware,
  taskMiddleware.createTaskValidate,
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
  taskMiddleware.updateTaskValidate,
  taskController.updateTask
);
router.delete(
  "/:id",
  userMiddleware.authenticationMiddleware,
  taskController.deleteTask
);

module.exports = router;
