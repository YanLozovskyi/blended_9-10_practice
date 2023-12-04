const carModel = require("../models/carModel");

class CarsService {
  findAllCars = async () => {
    const cars = await carModel.find({});
    return cars ? cars : null;
  };

  addCar = async (data) => {
    const car = await carModel.create({ ...data });
    return car ? car : null;
  };
}

module.exports = new CarsService();
