const router = require("express").Router();
const path = require("path");
const homeControllers = require("../controllers/home");

router.get("/", homeControllers.getHomePage);
router.get("/subscriptions", homeControllers.getSubscriptions);
router.post("/subscriptions", homeControllers.createSubscription);
router.put("/subscriptions", homeControllers.useSubscription);
router.delete("/subscriptions/:id", homeControllers.deleteSubscription);
router.post("/subscriptions/check", homeControllers.checkSubscription);

module.exports = router;
