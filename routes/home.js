const router = require("express").Router();
const path = require("path");
const homeControllers = require("../controllers/home");

router.get("/", homeControllers.getHomePage);
router.get("/subscirptions", homeControllers.getSubscriptions);
router.post("/subscirptions", homeControllers.createSubscription);

module.exports = router;
