const pool = require("../config/db.js");

// module.exports.getAllUsers = async (req, res) => {
//   const users = await UserModel.find().select("-password");
//   res.status(200).json(users);
// };

module.exports.getAllUsers = (req, res, next) => {
  const sqlSelect = `SELECT * FROM user`;
  pool.query(sqlSelect, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.status(200).json(result);
  });
};

// module.exports.createUser = (req, res, next) => {
//   const usr = [
//     req.body.user_name,
//     req.body.user_email,
//     req.body.user_password,
//     req.body.user_job,
//   ];
//   const sql = `INSERT INTO user (user_name, user_email, user_password, user_job) VALUES (?, ?, ?, ?)`;
//   pool.execute(sql, [...usr], (err, result) => {
//     if (!err) {
//       res.status(201).json({ message: "Utilisateur créé" });
//     } else {
//       res.status(400).json({ error: err });
//     }
//   });
// };

exports.createUser = (req, res, next) => {
  console.log(req.body);
  const { user_name, user_email, user_password, user_job } = req.body;
  const sqlInsert = `INSERT INTO user (user_name, user_email, user_password, user_job) VALUES (?, ?, ?, ?)`;
  pool.query(
    sqlInsert,
    [user_name, user_email, user_password, user_job],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      console.log("user created");
      res.status(201).json({ message: "user created" });
    }
  );
};

module.exports.deleteUser = (req, res, next) => {
  const id_user = req.params.id;
  console.log(req.params);
  const sqlDelete = `DELETE FROM user WHERE id_user = ?`;
  pool.query(sqlDelete, [id_user], (err, result) => {
    if (err) throw err;
    console.log("user deleted");
    res.status(200).json({ message: "user deleted" });
  });
};

module.exports.getOneUser = (req, res, next) => {
  const id = req.params.id;
  console.log(req.params);
  const sqlGet = `SELECT * FROM user WHERE id_user = ?`;
  pool.query(sqlGet, [id], (err, result) => {
    if (err) throw err;
    console.log("user get");
    console.log(result);
    res.status(200).json(result);
  });
};
// module.exports.getOneUser = (req, res, next) => {
//   const id = req.params.id;
//   console.log(id);
//   const sql = `SELECT * FROM user`;
//   pool.execute(sql, (err, result) => {
//     console.log(result);
//     res.status(200).json(result);
//   });
// };

// exports.getOneUser = (req, res, next) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknow : " + req.params.id);

//   UserModel.findById(req.params.id, (err, docs) => {
//     if (!err) res.send(docs);
//     else console.log("ID unknow : " + err);
//   }).select("-password");
// };

// exports.modifyUser = (req, res, next) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknow : " + req.params.id);

//   try {
//     UserModel.findOneAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: {
//           bio: req.body.bio,
//         },
//       },
//       { new: true, upsert: true, setDefaultsOnInsert: true },
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         if (err) return res.status(500).send({ message: err });
//       }
//     );
//   } catch (err) {
//     return res.status(500).json({ message: err });
//   }
// };

// exports.modifyUser = (req, res, next) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknow : " + req.params.id);

//   const userUpdate = { ...req.body };

//   UserModel.findOne({ _id: req.params.id })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({
//           error: new Error("User non trouvé !"),
//         });
//       }

//       UserModel.updateOne(
//         { _id: req.params.id },
//         { ...userUpdate, _id: req.params.id }
//       )
//         .then(() => res.status(200).json({ message: "Objet modifié !" }))
//         .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

// exports.deleteUser = (req, res, next) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("ID unknow : " + req.params.id);

//   UserModel.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "User deleted" }))
//     .catch((error) => res.status(400).json({ error }));
// };
