const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Post CRUD
router.get("/:id", userCtrl.getOneUser);
// router.get("/image/:id", auth, userCtrl.getProfilPicture);
router.put("/name/:id", userCtrl.updateUserName);
router.put("/job/:id", userCtrl.updateUserJob);
router.put(
  "/image/:id",
  // auth,
  upload.single("profil_image"),
  userCtrl.updateUserPicture
);

module.exports = router;
