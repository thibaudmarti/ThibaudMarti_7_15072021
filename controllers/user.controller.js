const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// module.exports.getAllUsers = async (req, res) => {
//   const users = await UserModel.find().select("-password");
//   res.status(200).json(users);
// };

exports.getAllUsers = (req, res, next) => {
  // Use find method to return an array of all the sauces in the database
  UserModel.find()
    .select("-password")
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknow : " + err);
  }).select("-password");
};

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

exports.modifyUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  const userUpdate = { ...req.body };

  UserModel.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: new Error("User non trouvé !"),
        });
      }

      UserModel.updateOne(
        { _id: req.params.id },
        { ...userUpdate, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Objet modifié !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknow : " + req.params.id);

  UserModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User deleted" }))
    .catch((error) => res.status(400).json({ error }));
};
