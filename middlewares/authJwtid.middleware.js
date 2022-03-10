const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");
require("dotenv").config();

module.exports = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const id_user = decodedToken.id;
    const sql = `SELECT * FROM user WHERE id_user = ?`;

    pool.query(sql, [id_user], (err, result) => {
      if (err) res.status(204).json(err);
      else if (!result[0]) {
        res.clearCookie("jwt");
        res.status(204).json({ message: "Unauthorized" });
      } else {
        res.locals.user = result[0];
        next();
      }
    });
  } else {
    res.status(204).json({ message: "Unauthorized" });
  }
};
