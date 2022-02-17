const pool = require("../config/db.js");

// exports.readPost = (req, res) => {
//   PostModel.find((err, docs) => {
//     if (!err) {
//       res.send(docs);
//     } else {
//       console.log("Error to get data : " + err);
//     }
//   });
// };
exports.readPost = (req, res, next) => {
  const sql = `SELECT * FROM post`;
  pool.execute(sql, (err, result) => {
    console.log(result);
    res.status(200).json(result);
  });
};

exports.createPost = (req, res) => {
  const sql = `INSERT INTO post (post_content, id_user) VALUE (?, ?);`;
  console.log(req.body.post_content);
  pool.execute(
    sql,
    [req.body.post_content, req.body.id_user],
    (err, result) => {
      if (!err) {
        res.status(201).json({ message: "success" });
      } else {
        res.status(400).json({ error: err });
      }
    }
  );
};

exports.updatePost = (req, res) => {};
exports.deletePost = (req, res) => {};
