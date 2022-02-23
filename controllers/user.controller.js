const pool = require("../config/db.js");

const fs = require("fs");

// RUD users

exports.getOneUser = (req, res, next) => {
  const { id: id_user } = req.params;
  const sqlGetUser = `SELECT * FROM user WHERE user.id_user = ?`;
  pool.query(sqlGetUser, [id_user], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    console.log(result[0]);
    res.status(200).json(result[0]);
  });
};

exports.updateUserName = (req, res, next) => {
  let { user_name } = req.body;
  const { id: id_user } = req.params;

  const sqlUpdateUser = `UPDATE user u SET user_name = ? WHERE u.id_user = ?`;
  pool.query(sqlUpdateUser, [user_name, id_user], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.updateUserJob = (req, res, next) => {
  let { user_job } = req.body;
  const { id: id_user } = req.params;

  const sqlUpdateUser = `UPDATE user u SET user_job = ? WHERE u.id_user = ?`;
  pool.query(sqlUpdateUser, [user_job, id_user], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};

exports.updateUserPicture = (req, res, next) => {
  const { id: id_user } = req.params;

  const sqlDeleteImg = `SELECT user_picture FROM user WHERE id_user = ?`;
  pool.query(sqlDeleteImg, [id_user], (err, result) => {
    if (
      result[0].user_picture &&
      result[0].user_picture !== "./images/profils/default/default.jpg"
    ) {
      const userPic = result[0].user_picture;
      const picName = userPic.split("./images/profils/")[1];
      fs.unlink(`images/profils/${picName}`, (err) => {
        if (err) throw err;
        console.log(`Former picture ${picName} has been deleted`);
      });
    }
  });

  if (req.file) {
    let { destination, filename } = req.file;
    destination = destination + filename;

    const sqlUpdateUser = `UPDATE user u SET user_picture = ? WHERE u.id_user = ?`;
    pool.query(sqlUpdateUser, [destination, id_user], (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  } else {
    return res.status(400).json({ error: "error" });
  }
};
