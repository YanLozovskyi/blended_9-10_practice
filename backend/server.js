require("../config/loadConfig");
require("colors");
const express = require("express");
const connectDb = require("../config/connectDb");
const urlNotFound = require("./middlewares/urlNotFound");
const errorHandler = require("./middlewares/errorHandler");
const asyncHandler = require("express-async-handler");
const UserModel = require("./models/userModel");
const bscrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middlewares/authMiddleware");
const roleModel = require("./models/roleModel");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/v1", require("./routes/carsRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

// реєстрація - додавання нового користувача в базу даних
app.post(
  "/register",
  asyncHandler(async (req, res) => {
    // отримуємо і валідуємо дані від користувача
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    //шукаємо користувача в базі
    const candidate = await UserModel.findOne({ email });
    // якщо знайшли, то повідомляємо про існування такого користувача
    if (candidate) {
      res.status(400);
      throw new Error("User already exists");
    }
    // якщо не знайшли, хешуємо пароль і видаємо роль
    const hashPassword = bscrypt.hashSync(password, 5);
    const roles = await roleModel.findOne({ title: "ADMIN" });
    // зберігаємо в базу з захешованим паролем
    const newUser = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [roles.title],
    });
    res.status(201);
    res.json({
      code: 201,
      data: {
        email: newUser.email,
      },
    });
  })
);
// аутентифікація - перевірка й порівняння даних, які надав користувач з тими, що зберігаються в базі
app.post(
  "/login",
  asyncHandler(async (req, res) => {
    // отримуємо і валідуємо дані від користувача
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }
    //шукаємо користувача в базі і розшифровуємо пароль

    const candidate = await UserModel.findOne({ email });
    if (!candidate || !bscrypt.compareSync(password, candidate.password)) {
      res.status(400);
      throw new Error("Invalid login or password");
    }

    // якщо знайшли і розшифрували, видаємо токен
    const token = generateToken({
      students: ["Ivanka", "Vlad", "Yan"],
      teacher: "Andrew",
      id: candidate._id,
      roles: candidate.roles,
    });

    // зберігаємо в базу з tokenom
    candidate.token = token;
    await candidate.save();

    res.status(200);
    res.json({
      code: 200,
      data: {
        email: candidate.email,
        token: candidate.token,
      },
    });
  })
);

function generateToken(data) {
  const payload = {
    ...data,
  };

  return jwt.sign(payload, "cat", { expiresIn: "23h" });
}
// авторизація - перевірка прав доступу

// logout - вихід з системи
app.patch(
  "/logout",
  authMiddleware,
  asyncHandler(async (req, res) => {
    // ми отримуємо дані про користувача і скидаємо йому токен
    const { id } = req.user;

    const user = await UserModel.findById(id);
    user.token = null;
    await user.save();
    res.status(200);
    res.json({
      code: 200,
      data: {
        message: "Logout success",
        token: user.token,
      },
    });
  })
);

app.use("*", urlNotFound);

app.use(errorHandler);

const { PORT } = process.env;

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.green.italic.bold);
});
