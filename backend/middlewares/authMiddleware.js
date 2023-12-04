const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // отримуємо токен
  try {
    const [type, token] = req.headers.authorization.split(" ");

    if (type !== "Bearer" || !token) {
      res.status(401);
      throw new Error("Bearer token is not provided");
    }

    // розшифруємо токен
    const decoded = jwt.verify(token, "cat");
    //передаємо інформацію з токена далі
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ code: 401, message: error.message });
  }
};

// {
//   students: [ 'Ivanka', 'Vlad', 'Yan' ],
//   teacher: 'Andrew',
//   id: '656c765d007682583cf74e43',
//   iat: 1701608395,
//   exp: 1701691195
// }
