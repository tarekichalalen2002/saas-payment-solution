const router = require("express").Router();
const authControllers = require("../controllers/auth");

router.get("/login", authControllers.loginPage);
router.post("/login", authControllers.login);

module.exports = router;
