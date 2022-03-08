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
    let passwordRegex =
      /^(?=.*?[a-z])(?=(.*[A-Z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    let alphaRegex = /^[\sa-z/-]{1,}$/i;
    let emailRegex = /^[\w_.-]+@[\w-_.]+\.[\w.]{2,}$/i;
    const formValidation = async () => {
      if (
        alphaRegex.test(req.body.user_name) === true &&
        alphaRegex.test(req.body.user_job) === true &&
        emailRegex.test(req.body.user_email) === true &&
        passwordRegex.test(req.body.user_password) === true
      ) {
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
            res.status(200).json({ message: "Email déjà enregistré !" });
          } else {
            res.status(201).json({ message: "User created !" });
          }
        });
      } else if (alphaRegex.test(req.body.user_name) === false) {
        res.status(400).json({ message: "name error" });
      } else if (alphaRegex.test(req.body.user_job) === false) {
        res.status(400).json({ message: "job error" });
      } else if (emailRegex.test(req.body.user_email) === false) {
        res.status(400).json({ message: "email error" });
      } else if (passwordRegex.test(req.body.user_password) === false) {
        res.status(400).json({ message: "pass error" });
      } else {
        res.status(400).json({ message: "error form" });
      }
    };

    if (req.body.user_admin) {
      if (req.body.user_admin === 1) {
        res.status(200).json({ message: "Vous ne pouvez pas devenir admin !" });
      } else if (req.body.user_admin === 0) {
        await formValidation();
      } else {
        res.status(400).json({ message: "Erreur : essayer user_admin = 0" });
      }
    } else {
      await formValidation();
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.login = (req, res) => {
  const { user_email, user_password: clearPassword } = req.body;
  const sql = `SELECT id_user, user_name, user_password, user_job, user_admin FROM user WHERE user_email=?`;

  pool.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // ===== Verify password with hash in DB ======
    if (results[0] && results[0].user_admin === 0) {
      const { user_password: hashedPassword, id_user } = results[0];

      const match = await bcrypt.compare(clearPassword, hashedPassword);
      if (!match) {
        return res.status(200).json({
          message: "Mauvaise combinaison email / mot de passe",
        });
      }

      // If match, generate JWT token

      const token = createToken(id_user);

      // remove the password key of the response
      delete results[0].user_password;

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
      res.status(200).json({
        id_user: results[0].id_user,
        token: jwt.sign({ id_user }, process.env.TOKEN_KEY, {
          expiresIn: "24h",
        }),
      });
    } else if (results[0] && results[0].user_admin === 1) {
      if (results[0].user_password === clearPassword) {
        const { id_user } = results[0];
        const token = createToken(id_user);

        delete results[0].user_password;

        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
        res.status(200).json({
          id_user: results[0].id_user,
          token: jwt.sign({ id_user }, process.env.TOKEN_KEY, {
            expiresIn: "24h",
          }),
        });
      } else {
        res.status(200).json({
          message: "Mauvais mot de passe",
        });
      }
    } else {
      res.status(200).json({ message: "Cet email n'existe pas" });
    }
  });
};

exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "logout with success" });
};

exports.deleteUser = (req, res, next) => {
  const id_user = req.params.id;

  const sqlDeleteImg = `SELECT user_picture FROM user WHERE id_user = ?`;
  pool.query(sqlDeleteImg, [id_user], (err, result) => {
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

    // res.cookie("jwt", "", { maxAge: 1 });
    res.clearCookie("jwt");
    res.status(200).json({ message: "user deleted" });
    // window.location = "/";
  });
};
