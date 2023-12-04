const express = require("express");
const rolesMiddleware = require("../middlewares/rolesMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const adminController = require("../controllers/AdminController");
const adminRouter = express.Router();

adminRouter.get(
  "/",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  adminController.main
);

adminRouter.get(
  "/users",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  adminController.getAll
);

adminRouter.patch(
  "/users/:id",
  authMiddleware,
  rolesMiddleware(["ADMIN"]),
  adminController.updateUser
);

module.exports = adminRouter;
