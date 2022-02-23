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
    console.log(req.headers.cookie);
    if (req.headers.cookie !== undefined && req.headers.cookie !== null) {
      const token = req.headers.cookie.split("=")[1];
      const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
      console.log(decodedToken);
      const { id_user } = decodedToken;
      const sql = `SELECT * FROM user WHERE id_user = ?`;
      pool.query(sql, [id_user], (err, result) => {
        if (err) res.status(204).json(err);
        else {
          console.log(result[0].user_name);
          res.user = result[0];
          console.log("succes auth");
          next();
        }
      });
    } else {
      // res.clearCookie();

      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    // res.clearCookie();
    // console.log(err);

    res.status(401).json({ message: err });
  }
};
