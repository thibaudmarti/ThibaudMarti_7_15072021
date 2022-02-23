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

// exports.readPost = (req, res, next) => {
//   const sql = `SELECT * FROM post`;
//   pool.execute(sql, (err, result) => {
//     console.log(result);
//     res.status(200).json(result);
//   });
// };

// exports.createPost = (req, res) => {
//   const sql = `INSERT INTO post (post_content, id_user) VALUE (?, ?);`;
//   console.log(req.body.post_content);
//   pool.execute(
//     sql,
//     [req.body.post_content, req.body.id_user],
//     (err, result) => {
//       if (!err) {
//         res.status(201).json({ message: "success" });
//       } else {
//         res.status(400).json({ error: err });
//       }
//     }
//   );
// };

exports.createPost = (req, res, next) => {
  let { body, file } = req;
  if (!file) delete req.body.post_image;
  body = {
    ...body,
    // likes: "",
  };

  const sqlInsert = "INSERT INTO post SET ?";
  pool.query(sqlInsert, body, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query
    const post_id = result.insertId;
    if (file) {
      const sqlInsertImage = `INSERT INTO images (image_url, post_id) VALUES ("${file.filename}", ${post_id})`;
      pool.query(sqlInsertImage, (err, result) => {
        if (err) {
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      res.status(200).json(result);
    }
  });
};

exports.getAllPosts = (req, res, next) => {
  const sql =
    "SELECT * FROM post p, user u WHERE u.active=1 AND p.post_author = u.id_user "; //ORDER BY date_creation DESC;
  pool.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    result.forEach((element) => delete element.user_password);
    res.status(200).json(result);
  });
};

exports.updatePostContent = (req, res, next) => {
  let { post_content } = req.body;
  const { id: id_post } = req.params;

  const sqlUpdateUser = `UPDATE post p SET post_content = ? WHERE p.id_post = ?`;
  pool.query(sqlUpdateUser, [post_content, id_post], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.deleteOnePost = (req, res, next) => {
  const { id: id_post } = req.params;
  const sql = `DELETE FROM post p WHERE p.id_post = ?`;
  pool.query(sql, [id_post], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// // Like & unlike a post

exports.likePost = (req, res) => {
  const { like_author } = req.body;
  const { id: like_post } = req.params;
  console.log(req.params);
  const sqlSelect = `SELECT * FROM likes l WHERE l.like_author = ? AND l.like_post = ?`;
  pool.query(sqlSelect, [like_author, like_post], (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
      res.status(404).json({ err });
      throw err;
    }

    if (result.length === 0) {
      const sqlInsert = `INSERT INTO likes (like_author, like_post) VALUES (?, ?)`;
      pool.query(sqlInsert, [like_author, like_post], (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json({ err });
          throw err;
        }
        res.status(200).json(result);
      });
    } else {
      const sqlDelete = `DELETE FROM likes l WHERE l.like_author = ? AND l.like_post = ?`;
      pool.query(sqlDelete, [like_author, like_post], (err, result) => {
        if (err) {
          console.log(err);
          res.status(404).json(err);
          throw err;
        }
        res.status(200).json(result);
      });
    }
  });
};

exports.postLikedByUser = (req, res) => {
  const { like_author } = req.body;
  const { id: like_post } = req.params;
  const sql = `SELECT like_author, like_post FROM likes WHERE like_author = ? AND like_post = ?`;
  pool.query(sql, [like_author, like_post], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

exports.countLikes = (req, res) => {
  const { id: like_post } = req.params;
  const sqlInsert = `SELECT COUNT(*) AS total FROM likes WHERE likes.like_post = ?`;
  pool.query(sqlInsert, [like_post], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
