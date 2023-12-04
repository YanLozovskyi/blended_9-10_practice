const carModel = require("../models/carModel");
const asyncHandler = require("express-async-handler");
const carsService = require("../services/CarsService");

class CarsController {
  add = asyncHandler(async (req, res) => {
    const { title, color } = req.body;
    if (!title || !color) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    const car = await carsService.addCar({ ...req.body });

    if (!car) {
      res.status(400);
      throw new Error("Unable to save car");
    }

    res.status(201);
    res.json({ code: 201, car });
  });

  getAll = asyncHandler(async (req, res) => {
    const cars = await carsService.findAllCars();
    if (!cars) {
      res.status(400);
      throw new Error("Unable to fetch cars");
    }
    res.status(200);
    res.json({ code: 200, cars, quantity: cars.length });
  });

  // Валідний , існуючий
  // Валідний, не існуючий
  // Не валідний
  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const car = await carModel.findById(id);
    if (!car) {
      res.status(404);
      throw new Error(`Car with id: ${id} is not found`);
    }

    res.status(200);
    res.json({ code: 200, car });
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const car = await carModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { runValidators: true, new: true }
    );
    if (!car) {
      res.status(404);
      throw new Error(`Car with id: ${id} is not found`);
    }

    res.status(200);
    res.json({ code: 200, car });
  });

  remove = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const car = await carModel.findByIdAndDelete(id);

    if (!car) {
      res.status(404);
      throw new Error(`Car with id: ${id} is not found`);
    }

    res.status(200);
    res.json({ code: 200, car });
  });
}

module.exports = new CarsController();
