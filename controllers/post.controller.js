const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error to get data : " + err);
    }
  });
};
exports.createPost = (req, res) => {};
exports.updatePost = (req, res) => {};
exports.deletePost = (req, res) => {};
