const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");

// auth
// router.post("/register", authController.signUp);
// router.post("/login", authController.login);
// router.get("/logout", authController.logout);

// user DB
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.get("/:id", userController.getOneUser);
// router.put("/:id", userController.modifyUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
