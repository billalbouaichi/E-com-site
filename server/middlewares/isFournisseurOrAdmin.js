function isForA(req, res, next) {
  const user = req.user.type;

  if (user[0] === "Admin" || user[0] === "Fournisseurs") {
    next();
  } else {
    res.status(403).json({ message: "Acces Interdit vous nest pas un admin" });
  }
}

module.exports = isForA;
