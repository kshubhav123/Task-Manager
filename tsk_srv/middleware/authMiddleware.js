require("dotenv").config();
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Please provide a valid token" });
  }

  jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ error: "Invalid token" });
    }
    // console.log(decoded);

    const userId = decoded.userId;
    req.userId = userId;
    console.log(userId);
    next();
  });
};

module.exports = { authentication };
