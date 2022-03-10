const pool = require("../config/db.js");

const fs = require("fs");

let alphaRegex = /^[\sa-z/-]{1,}$/i;

const deleteImg = (filename) => {
  fs.unlink(`client/public/uploads/profil/${filename}`, (err) => {
    if (err) throw err;
  });
};

exports.getOneUser = (req, res, next) => {
  const { id: id_user } = req.params;

  const sqlGetUser = `SELECT * FROM user WHERE user.id_user = ?`;
  pool.query(sqlGetUser, [id_user], (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].user_password;
    res.status(200).json(result[0]);
  });
};

exports.updateUserName = (req, res, next) => {
  let { user_name } = req.body;
  const { id: id_user } = req.params;
  if (alphaRegex.test(user_name) === true) {
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
  } else {
    res.status(400);
  }
};

exports.updateUserJob = (req, res, next) => {
  let { user_job } = req.body;
  const { id: id_user } = req.params;
  if (alphaRegex.test(user_job) === true) {
    const sqlUpdateUser = `UPDATE user u SET user_job = ? WHERE u.id_user = ?`;
    pool.query(sqlUpdateUser, [user_job, id_user], (err, result) => {
      if (err) {
        res.status(400).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  } else {
    res.status(400);
  }
};

exports.updateUserPicture = (req, res, next) => {
  const { id: id_user } = req.params;
  if (req.file) {
    const sqlDeleteImg = `SELECT user_picture FROM user WHERE id_user = ?`;
    pool.query(sqlDeleteImg, [id_user], (err, result) => {
      if (result[0].user_picture) {
        const userPic = result[0].user_picture;
        const picName = userPic.split("./uploads/profil/")[1];
        fs.unlink(`client/public/uploads/profil/${picName}`, (err) => {
          if (err) throw err;
          console.log(`Former picture ${picName} has been deleted`);
        });
      }
    });

    if (
      req.file.mimetype != "image/jpg" &&
      req.file.mimetype != "image/png" &&
      req.file.mimetype != "image/jpeg"
    ) {
      deleteImg(req.file.filename);
      res.status(200).json({
        message: "Format Invalide, format compatible : .jpg, .jpeg, ou .png",
      });
    } else if (req.file.size > 3000000) {
      deleteImg(req.file.filename);
      res.status(200).json({
        message:
          "Ficher trop volumineux, veuillez choisir un fichier d'une taille inférieure a 3 Mo",
      });
    } else {
      let { destination, filename } = req.file;
      destination = `./uploads/profil/` + filename;

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
    }
  } else {
    return res.status(200).json({ message: "Pas de fichier sélectionné !" });
  }
};
