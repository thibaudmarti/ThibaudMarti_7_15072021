const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

// Auth
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/desactivateUser/:id", userCtrl.desactivateUser);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;
