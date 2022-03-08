const pool = require("../config/db.js");

// CRUD comments
exports.createComment = (req, res, next) => {
  const { comment_author, comment_content } = req.body;
  const { id: comment_post } = req.params;

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
  const sql = `SELECT * FROM comment c, user u WHERE c.comment_post = ? AND u.id_user = c.comment_author`;
  pool.query(sql, [id_post], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    result.forEach((element) => delete element.user_password);
    res.status(200).json(result);
  });
};
