const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");

router.post("/:id", commentCtrl.createComment);
router.get("/:id/allComments", commentCtrl.getAllComments);
router.delete("/:id", commentCtrl.deleteOneComment);

module.exports = router;
