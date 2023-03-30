const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authtoken = req.headers.authorization;
  if (authtoken) {
    const token = authtoken.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decodedToken;
      next();
    } catch (error) {
      throw new Error("Invalid Token , acces Interdit");
    }
  } else {
    throw new Error("veuillez se connecter");
  }
}
module.exports = verifyToken;
