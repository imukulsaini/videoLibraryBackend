const mySecret = process.env["keySecret"];

const jwt = require("jsonwebtoken");

function authVerify(req, res, next) {
  const token = req.headers.authorization;
  try {
    let decoded = jwt.verify(token, mySecret);
    req.userId = { userID: decoded.userID };
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: " An authentication error." });
  }
}

module.exports = authVerify;
