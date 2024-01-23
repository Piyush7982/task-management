const express = require("express");
const router = express.Router();
const { adminController } = require("../../controller");
const { adminMiddleware } = require("../../middleware");

router.put(
  "/create",
  adminMiddleware.authenticationMiddleware,
  adminController.createAdmin
);
router.get(
  "/users",
  adminMiddleware.authenticationMiddleware,
  adminController.getAllUsers
);
router.put(
  "/remove",
  adminMiddleware.authenticationMiddleware,
  adminController.removeAdmin
);
router.delete(
  "/",
  adminMiddleware.authenticationMiddleware,
  adminController.deleteUser
);
router.get(
  "/",
  adminMiddleware.authenticationMiddleware,
  adminController.getAllAdmins
);
router.post("/login", adminController.adminLogin);

module.exports = router;
