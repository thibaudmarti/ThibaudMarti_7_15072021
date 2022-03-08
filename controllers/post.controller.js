const pool = require("../config/db.js");

const fs = require("fs");

const deleteImg = (filename) => {
  fs.unlink(`client/public/uploads/posts/${filename}`, (err) => {
    if (err) throw err;
  });
};

exports.createPost = (req, res, next) => {
  let { body, file } = req;

  if (!file) {
    const sqlInsert = "INSERT INTO post SET ?";
    pool.query(sqlInsert, [body], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      } else {
        res.status(200).json(result);
      }
    });
  }

  // post_id will be equal to the post inserted, and will be reused to link the image at the correct post in the below query

  if (file) {
    if (
      file.mimetype != "image/jpg" &&
      file.mimetype != "image/png" &&
      file.mimetype != "image/jpeg"
    ) {
      deleteImg(file.filename);
      res.status(200).json({
        message: "Format Invalide, format compatible : .jpg, .jpeg, ou .png",
      });
    } else if (file.size > 1000000) {
      deleteImg(file.filename);
      res.status(200).json({
        message:
          "Ficher trop volumineux, veuillez choisir un fichier d'une taille inférieure a 1 Mo",
      });
    } else {
      let { filename } = req.file;
      destination = `./uploads/posts/` + filename;
      const sqlInsertImage = `INSERT INTO post (post_content, post_author, post_image) VALUES (?, ?, ?)`;
      pool.query(
        sqlInsertImage,
        [body.post_content, body.post_author, destination],
        (err, result) => {
          if (err) {
            res.status(404).json({ err });
          }
          res.status(200).json(result);
        }
      );
    }
  }
};

exports.getAllPosts = (req, res, next) => {
  const sql =
    "SELECT * FROM post p, user u WHERE p.post_author = u.id_user ORDER BY p.id_post DESC";
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

  const sqlDeleteImg = `SELECT post_image FROM post WHERE id_post = ?`;
  pool.query(sqlDeleteImg, [id_post], (err, result) => {
    if (result[0].post_image) {
      const postPic = result[0].post_image;
      const picName = postPic.split("./uploads/posts/")[1];
      fs.unlink(`client/public/uploads/posts/${picName}`, (err) => {
        if (err) throw err;
        console.log(`Former picture post ${picName} has been deleted`);
      });
    }
  });

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

exports.getAllLikes = (req, res, next) => {
  const sql = "SELECT * FROM likes l, post p WHERE l.like_post = p.id_post";
  pool.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }

    res.status(200).json(result);
  });
};

exports.likePost = (req, res) => {
  const { like_author } = req.body;
  const { id: like_post } = req.params;
  // console.log(req.params);
  const sqlSelect = `SELECT * FROM likes l WHERE l.like_author = ? AND l.like_post = ?`;
  pool.query(sqlSelect, [like_author, like_post], (err, result) => {
    // console.log(result);
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
