const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "You are not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, config.ACCESS_TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.message === "jwt expired") {
      return res.status(403).json({ msg: "Token has expired" });
    }
    return res.status(403).send(err.message);
  }

  return next();
};

module.exports = verifyToken;
