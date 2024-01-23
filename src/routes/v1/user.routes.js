const express = require("express");
const router = express.Router();
const { userController } = require("../../controller");

router.post("/", userController.createUser);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.login);
router.get("/tasks/:id", userController.getAllTasks);
router.post("/logout", userController.logout);

module.exports = router;
