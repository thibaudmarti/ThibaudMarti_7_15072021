const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "post_image")
      cb(null, "./client/public/uploads/posts/");
    else if (file.fieldname === "profil_image")
      cb(null, "./client/public/uploads/profil/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    const nameWithoutExtension = name.split("." + extension).join("_");
    callback(null, nameWithoutExtension + Date.now() + "." + extension);
  },
});

const upload = multer({ storage });

module.exports = upload;
