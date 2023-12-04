const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: [true, "YanDB: email is required"] },
  password: { type: String, required: [true, "YanDB: password is required"] },
  name: { type: String, default: "Ivanka" },
  token: { type: String, default: 0 },
  roles: [{ type: String, ref: "role" }],
});

module.exports = model("user", userSchema);
