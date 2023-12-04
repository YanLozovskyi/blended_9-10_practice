const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const roleModel = require("../models/roleModel");

class AdminController {
  main = asyncHandler(async (req, res) => {
    res.send("Admin panel");
  });

  updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    const roles = await roleModel.findOne({ title: "MODERATOR" });
    user.roles = roles.title;
    await user.save();

    res.status(200).json({
      code: 200,
      data: {
        email: user.email,
        roles: user.roles,
      },
    });
  });

  getAll = asyncHandler(async (req, res) => {
    const users = await userModel.find({});

    res.status(200).json({
      code: 200,
      data: {
        users,
        qty: users.length,
      },
    });
  });
}

module.exports = new AdminController();
