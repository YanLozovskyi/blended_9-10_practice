const { model, Schema } = require("mongoose");

const carSchema = new Schema({
  title: { type: String, required: [true, "YanDB: title is required"] },
  color: { type: String, required: [true, "YanDB: color is required"] },
  year: { type: Number, default: 2010 },
  price: { type: Number, default: 5000 },
});

module.exports = model("car", carSchema);
