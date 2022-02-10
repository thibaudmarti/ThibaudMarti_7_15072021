const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const maxAge = 2 * 24 * 60 * 60 * 1000; // 2 days
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: maxAge,
  });
};

// module.exports.signUp = async (req, res) => {
//   const { name, email, job, password } = req.body;

//   try {
//     const user = await UserModel.create({ name, email, job, password });
//     res.status(201).json({ user: user._id });
//   } catch (err) {
//     res.status(200).json({ message: err });
//   }
// };

exports.signUp = (req, res, next) => {
  // encrypt password with bcrypt
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      // Create User
      const user = new UserModel({
        name: req.body.name,
        job: req.body.job,
        email: req.body.email,
        password: hash,
      });
      // The save method saves the new user created in the "users" collection of the database
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  // find user by email, witch is unique, in the body of the request
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      // compare password between request and the user found
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }

          const token = createToken(user._id);
          res.cookie("jwt", token, { httpOnly: true, maxAge });

          // send response for userId and token to front
          res.status(200).json({
            userId: user._id,
            // token: jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, {
            //   expiresIn: 2 * 24 * 60 * 60 * 1000,
            // }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
