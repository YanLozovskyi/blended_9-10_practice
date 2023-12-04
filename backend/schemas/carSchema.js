const Joi = require("joi");

const carSchema = Joi.object({
  title: Joi.string().required(),
  color: Joi.string().required(),
  year: Joi.string(),
  price: Joi.string(),
});

module.exports = carSchema;
