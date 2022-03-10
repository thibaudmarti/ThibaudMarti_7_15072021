const pool = require("../config/db.js");
require("dotenv").config();

module.exports = (req, res, next) => {
  const sql = `INSERT INTO user (user_name, user_email, user_password, user_job, user_admin)
  VALUES
  ('Admin', '${process.env.ADMIN_EMAIL1}', '${process.env.ADMIN_PASSWORD}', 'Moderator', 1),
  ('Admin', '${process.env.ADMIN_EMAIL2}', '${process.env.ADMIN_PASSWORD}', 'Moderator', 1);`;
  pool.query(sql, (err, result) => {
    if (err) {
      res.status(200).json({ error: "admin already there" });
    } else if (!result) {
      res.status(304).json({ error: "admin already there" });
    } else {
      next();
    }
  });
};
