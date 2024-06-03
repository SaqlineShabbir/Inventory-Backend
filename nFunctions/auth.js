const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET_KEY; // Replace with your actual secret key

function createToken(user) {
  const token = jwt.sign(
    {
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
}

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    const verify = jwt.verify(token, JWT_SECRET);
    if (!verify?.email) {
      return res.status(401).json({ message: "You are not authorized" });
    }
    req.user = verify.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { createToken, verifyToken };
