module.exports = (rolesArray) => {
  return (req, res, next) => {
    try {
      const { roles } = req.user;

      let hasRole = false;
      roles.forEach((role) => {
        if (rolesArray.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        res.status(403);
        throw new Error("Forbidden");
      }

      next();
    } catch (error) {
      res.status(403).json({ code: 403, message: error.message });
    }
  };
};

// {
//   students: [ 'Ivanka', 'Vlad', 'Yan' ],
//   teacher: 'Andrew',
//   id: '656c8b3cf08bc10080f35320',
//   roles: [ 'ADMIN' ],
//   iat: 1701612455,
//   exp: 1701695255
// }
