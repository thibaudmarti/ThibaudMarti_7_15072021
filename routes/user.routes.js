const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const upload = require("../middlewares/multer-config");

router.get("/:id", userCtrl.getOneUser);
router.put("/name/:id", userCtrl.updateUserName);
router.put("/job/:id", userCtrl.updateUserJob);
router.put(
  "/image/:id",
  upload.single("profil_image"),
  userCtrl.updateUserPicture
);

module.exports = router;
