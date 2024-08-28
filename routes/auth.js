const router = require("express").Router();
const authControllers = require("../controllers/auth");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/login", authControllers.loginPage);
router.post("/login", authControllers.login);
router.get("/logout", authMiddleware, authControllers.logout);
router.get("/check", authMiddleware, authControllers.check);

module.exports = router;
