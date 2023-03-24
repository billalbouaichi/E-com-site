const ApiError = require("../utils/apiError");

function isAdmin(req, res, next) {
  const user = req.user.type;

  if (user[0] === "Admin") {
    next();
  } else {
    res.status(403).json({ message: "Acces Interdit vous nest pas un admin" });
  }
}

module.exports = isAdmin;
