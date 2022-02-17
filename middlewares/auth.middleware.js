// const jwt = require("jsonwebtoken");
// const UserModel = require("../models/user.model");

// module.exports.checkUser = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
//       if (err) {
//         res.locals.user = null;
//         // res.cookie("jwt", "", { maxAge: 1 });
//         next();
//       } else {
//         let user = await UserModel.findById(decodedToken.id);
//         res.locals.user = user;
//         console.log(user);
//         next();
//       }
//     });
//   } else {
//     res.locals.user = null;
//     next();
//   }
// };

// module.exports.requireAuth = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
//       if (err) {
//         console.log(err);
//         res.send(200).json("no token");
//       } else {
//         console.log(decodedToken.id);
//         next();
//       }
//     });
//   } else {
//     console.log("no token");
//   }
// };

// // middleware of authentification to secure the routes
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// module.exports = (req, res, next) => {
//   try {
//     // check if token is the good one
//     const token = req.headers.authorization.split(" ")[1];
//     const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
//     const userId = decodedToken.userId;
//     req.auth = { userId };
//     // compare userId with the token userId
//     if (req.body.userId && req.body.userId !== userId) {
//       throw "User ID non valable !";
//     } else {
//       next();
//     }
//   } catch (error) {
//     res.status(401).json({ error: error | "Requête non authentifiée !" });
//   }
// };

const jwt = require("jsonwebtoken");
const pool = require("../config/db.js");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const { jwt: token } = req.cookies;
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      const { user_id: userId } = decodedToken;
      const sql = `SELECT id_user FROM user WHERE id_user = ?`;
      pool.query(sql, [userId], (err, result) => {
        if (err) res.status(204).json(err);
        else {
          console.log("succes auth");
          next();
        }
      });
    } else {
      res.clearCookie();
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.clearCookie();
    console.log(err);
    res.status(401).json({ message: "Unauthorized" });
  }
};
