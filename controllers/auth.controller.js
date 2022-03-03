const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../config/db.js");
const fs = require("fs");

const maxAge = 1 * (24 * 60 * 60 * 1000);

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: maxAge,
  });
};

exports.signup = async (req, res) => {
  try {
    const { user_password: password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = "INSERT INTO user SET ?";

    pool.query(sql, user, (err, result) => {
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré" });
      } else {
        res.status(201).json({ message: "User created !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Failed registration", err });
  }
};

exports.login = (req, res) => {
  const { user_email, user_password: clearPassword } = req.body;
  const sql = `SELECT id_user, user_name, user_password, user_job, active FROM user WHERE user_email=?`;

  pool.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verify password with hash in DB ======
    if (results[0] && results[0].active === 1) {
      try {
        const { user_password: hashedPassword, id_user } = results[0];

        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (!match) {
          res.status(200).json({
            error: true,
            message: "Mauvaise combinaison email / mot de passe",
          });
        }

        // If match, generate JWT token
        // const maxAge = 1 * (24 * 60 * 60 * 1000);
        const token = createToken(id_user);

        // httpOnly: true,
        // maxAge,
        // sameSite: true,
        // secure: true,

        // remove the password key of the response
        delete results[0].user_password;

        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({
          id_user: results[0].id_user,
          token: jwt.sign({ id_user }, process.env.TOKEN_KEY, {
            expiresIn: "24h",
          }),
        });
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (results[0] && results[0].active === 0) {
      res.status(200).json({
        error: true,
        message: "Votre compte a été désactivé",
      });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};

exports.desactivateUser = (req, res) => {
  const id_user = req.params.id;
  const sql = `UPDATE user u SET active=0 WHERE u.id_user = ?`;

  pool.query(sql, [id_user], (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }
    res.clearCookie("jwt");
    res.status(200).json("DESACTIVATE");
  });
};

exports.deleteUser = (req, res, next) => {
  const id_user = req.params.id;

  const sqlDeleteImg = `SELECT user_picture FROM user WHERE id_user = ?`;
  pool.query(sqlDeleteImg, [id_user], (err, result) => {
    // console.log(result);
    if (result[0].user_picture) {
      const postPic = result[0].user_picture;
      const picName = postPic.split("./uploads/profil/")[1];
      fs.unlink(`client/public/uploads/profil/${picName}`, (err) => {
        if (err) throw err;
        console.log(`Former user picture ${picName} has been deleted`);
      });
    }
  });

  const sqlDelete = `DELETE FROM user WHERE id_user = ?`;
  pool.query(sqlDelete, [id_user], (err, result) => {
    if (err) return res.status(404).json({ err });
    console.log("user deleted");
    // res.cookie("jwt", "", { maxAge: 1 });
    res.clearCookie("jwt");
    res.status(200).json({ message: "user deleted" });
    // window.location = "/";
  });
};

// const UserModel = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const maxAge = 2 * 24 * 60 * 60 * 1000; // 2 days

// const createToken = (id) => {
//   return jwt.sign({ id }, process.env.TOKEN_KEY, {
//     expiresIn: maxAge,
//   });
// };

// // module.exports.signUp = async (req, res) => {
// //   const { name, email, job, password } = req.body;

// //   try {
// //     const user = await UserModel.create({ name, email, job, password });
// //     res.status(201).json({ user: user._id });
// //   } catch (err) {
// //     res.status(200).json({ message: err });
// //   }
// // };

// exports.signUp = (req, res, next) => {
//   // encrypt password with bcrypt
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       // Create User
//       const user = new UserModel({
//         name: req.body.name,
//         job: req.body.job,
//         email: req.body.email,
//         password: hash,
//       });
//       // The save method saves the new user created in the "users" collection of the database
//       user
//         .save()
//         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//         .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// module.exports.login = (req, res, next) => {
//   // find user by email, witch is unique, in the body of the request
//   UserModel.findOne({ email: req.body.email })
//     .then((user) => {
//       if (!user) {
//         return res.status(401).json({ error: "Utilisateur non trouvé !" });
//       }
//       // compare password between request and the user found
//       bcrypt
//         .compare(req.body.password, user.password)
//         .then(async (valid) => {
//           if (!valid) {
//             return res.status(401).json({ error: "Mot de passe incorrect" });
//           }

//           const token = createToken(user._id);
//           res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });

//           // send response for id_user and token to front
//           res.status(200).json({ user: user._id });
//         })
//         .catch((error) => res.status(500).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// // exports.logout = (req, res, next) => {
// //   res.cookie("jwt", "", { maxAge: 1 });
// //   res.redirect("/");
// // };
