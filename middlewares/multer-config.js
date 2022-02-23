const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "post_image") cb(null, "./images/posts/");
    else if (file.fieldname === "profil_image") cb(null, "./images/profils/");
  },
  filename: (req, file, callback) => {
    // remove space
    const name = file.originalname.split(" ").join("_");
    // choose the right extension
    const extension = MIME_TYPES[file.mimetype];
    // remove extension from the original name
    const nameWithoutExtension = name.split("." + extension).join("_");
    // unique assembly (original name, current date . extension)
    callback(null, nameWithoutExtension + Date.now() + "." + extension);
  },
});

const upload = multer({ storage });

module.exports = upload;
