const pool = require("../config/db.js");

// CRUD comments
exports.createComment = (req, res, next) => {
  const { comment_post, comment_author, comment_content } = req.body;
  console.log(req.body);
  const sql = `INSERT INTO comment ( comment_post, comment_author, comment_content) VALUES ( ?, ?, ?)`;
  pool.query(
    sql,
    [comment_post, comment_author, comment_content],
    (err, result) => {
      if (err) {
        res.status(404).json({ err });
        console.log(err);
        throw err;
      }
      res.status(201).json(result);
    }
  );
};

// exports.getOneComment = (req, res) => {
//   const id_comment = req.params.id;
//   const sql = `SELECT * FROM comment WHERE comment.id_comment = ?`;
//   pool.query(sql, [id_comment], (err, result) => {
//     if (err) {
//       res.status(404).json({ err });
//       throw err;
//     }
//     res.status(200).json(result);
//   });
// };

exports.deleteOneComment = (req, res) => {
  const id_comment = req.params.id;
  const sql = `DELETE FROM comment WHERE comment.id_comment = ?`;
  pool.query(sql, [id_comment], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.getAllComments = (req, res) => {
  const id_post = req.params.id;
  const sql = `SELECT * FROM comment WHERE comment.comment_post = ?`;
  pool.query(sql, [id_post], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
