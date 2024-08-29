const router = require("express").Router();
const path = require("path");
const homeControllers = require("../controllers/home");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, homeControllers.getHomePage);
router.get("/subscriptions", authMiddleware, homeControllers.getSubscriptions);
router.post(
  "/subscriptions",
  authMiddleware,
  homeControllers.createSubscription
);
router.delete(
  "/subscriptions/:id",
  authMiddleware,
  homeControllers.deleteSubscription
);
router.post("/subscriptions/check", homeControllers.checkSubscription);
router.put("/subscriptions", homeControllers.useSubscription);

module.exports = router;
