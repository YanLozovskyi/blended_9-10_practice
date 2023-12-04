// /api/v1/cars

const express = require("express");
const carsController = require("../controllers/CarsController");
const carSchema = require("../schemas/carSchema");
const carBodyValidate = require("../middlewares/carBodyValidate");
const validateId = require("../middlewares/validateId");
const rolesMiddleware = require("../middlewares/rolesMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const carsRouter = express.Router();

// Додати машину

carsRouter.post("/cars", carBodyValidate(carSchema), carsController.add);

// Отримати всі машини

carsRouter.get(
  "/cars",
  authMiddleware,
  rolesMiddleware(["ADMIN", "MODERATOR", "STUDENT"]),
  carsController.getAll
);

// Отримати одну машину

carsRouter.get("/cars/:id", validateId, carsController.getById);

// Обновити машину

carsRouter.put("/cars/:id", validateId, carsController.update);

// Видалити машину

carsRouter.delete("/cars/:id", validateId, carsController.remove);

module.exports = carsRouter;
