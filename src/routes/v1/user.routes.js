const express = require("express");
const router = express.Router();
const { userController } = require("../../controller");
const { userMiddleware } = require("../../middleware");

router.post("/", userMiddleware.createUserValidate, userController.createUser);
router.get(
  "/",
  userMiddleware.authenticationMiddleware,
  userController.getUserById
);
router.put(
  "/",
  userMiddleware.authenticationMiddleware,
  userMiddleware.updateUserValidate,
  userController.updateUser
);
router.delete(
  "/",
  userMiddleware.authenticationMiddleware,
  userController.deleteUser
);
router.post("/login", userMiddleware.loginValidate, userController.login);
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
