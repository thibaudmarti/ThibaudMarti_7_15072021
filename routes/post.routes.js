const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer-config");

// Post CRUD
router.get("/", auth, postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", auth, upload.single("post_image"), postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deleteOnePost);
router.put("/:id", auth, postCtrl.updatePostContent);

// Images
// router.get("/image/:id", auth, postCtrl.getOneImage);

// Like / Unlike
router.patch("/:id/like", auth, postCtrl.likePost);
router.post("/:id/postLikedByUser", auth, postCtrl.postLikedByUser);
router.get("/:id/countLike", auth, postCtrl.countLikes);

module.exports = router;
