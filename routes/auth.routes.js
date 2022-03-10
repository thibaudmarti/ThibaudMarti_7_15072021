const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth.controller");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
