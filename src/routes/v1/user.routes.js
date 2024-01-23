const express = require("express");
const router = express.Router();
const { userController } = require("../../controller");
const { userMiddleware } = require("../../middleware");

router.post("/", userController.createUser);
router.get(
  "/:id",
  userMiddleware.authenticationMiddleware,
  userController.getUserById
);
router.put(
  "/:id",
  userMiddleware.authenticationMiddleware,
  userController.updateUser
);
router.delete(
  "/:id",
  userMiddleware.authenticationMiddleware,
  userController.deleteUser
);
router.post("/login", userController.login);
router.get(
  "/tasks/all",
  userMiddleware.authenticationMiddleware,
  userController.getAllTasks
);
router.post(
  "/logout",
  userMiddleware.authenticationMiddleware,
  userController.logout
);

module.exports = router;
