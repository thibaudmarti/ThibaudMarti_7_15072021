const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

// Auth
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", auth, userCtrl.logout);
router.get("/desactivateUser/:id", auth, userCtrl.desactivateUser);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;
