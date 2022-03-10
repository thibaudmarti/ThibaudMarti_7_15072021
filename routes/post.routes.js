const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.controller");
const upload = require("../middlewares/multer-config");

router.get("/", postCtrl.getAllPosts);
router.post("/", upload.single("post_image"), postCtrl.createPost);
router.delete("/:id", postCtrl.deleteOnePost);
router.put("/:id", postCtrl.updatePostContent);

router.get("/likes", postCtrl.getAllLikes);
router.patch("/:id/like", postCtrl.likePost);
router.post("/:id/postLikedByUser", postCtrl.postLikedByUser);
router.get("/:id/countLikes", postCtrl.countLikes);

module.exports = router;
