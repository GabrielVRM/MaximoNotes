require("dotenv").config();
const secret = process.env.JWT_TOKEN;

const jwt = require("jsonwebtoken");

const User = require("../models/users");

const withAuth = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
  } else {
    jwt.verify(token, secret, (err, decode) => {
      if (err) res.status(401).json({ error: "Unathorized: Token Invalid" });
      else {
        req.email = decode.email;
        User.findOne({ email: decode.email })
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            res.status(401).json({ error: err });
          });
      }
    });
  }
};

module.exports = withAuth;
