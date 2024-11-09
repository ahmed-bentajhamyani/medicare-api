const jwt = require("jsonwebtoken");

// env varialbes
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

    res.userId = decoded.userId;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
}

module.exports = verifyToken;
