const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middlewares/auth.middleware");

// Comments CRUD
router.post("/:id", commentCtrl.createComment);
router.get("/:id/allComments", commentCtrl.getAllComments);
// router.get("/:id", auth, commentCtrl.getOneComment);
router.delete("/:id", commentCtrl.deleteOneComment);

module.exports = router;
