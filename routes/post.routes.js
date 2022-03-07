const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const upload = require("../middlewares/multer-config");

// Post CRUD
router.get("/", postCtrl.getAllPosts);
// router.get("/:id", auth, postCtrl.getOnePost);
router.post("/", upload.single("post_image"), postCtrl.createPost);
router.delete("/:id", postCtrl.deleteOnePost);
router.put("/:id", postCtrl.updatePostContent);

// Images
// router.get("/image/:id", auth, postCtrl.getOneImage);

// Like / Unlike
router.get("/likes", postCtrl.getAllLikes);
// router.get("/like/:id", postCtrl.getOneLike);
router.patch("/:id/like", postCtrl.likePost);
router.post("/:id/postLikedByUser", postCtrl.postLikedByUser);
router.get("/:id/countLikes", postCtrl.countLikes);

module.exports = router;
