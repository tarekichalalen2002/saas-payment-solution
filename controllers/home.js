const path = require("path");
const Subscription = require("../models/Subscription");
exports.getHomePage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/home", "index.html"));
};

exports.getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSubscription = async (req, res) => {
  const { full_name, expiration_date, code, hashKey, hashedValue } = req.body;
  try {
    const subscription = new Subscription({
      full_name,
      expiration_date,
      status: "active",
      used: false,
      code,
      hashKey,
      hashedValue,
    });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.useSubscription = async (req, res) => {
  const { code } = req.body;
  try {
    const sub = await Subscription.findOne({ code: code });
    if (sub) {
      if (sub.used) {
        return res
          .state(404)
          .json({ message: "This subscription is already used" });
      }
      sub.used = true;
      await sub.save();
      return res.status(200).json({ hashedValue: sub.hashedValue });
    } else {
      return res.status(404).json({ message: "subscription not existing" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkSubscription = async (req, res) => {
  const { hashedValue } = req.body;
  try {
    const sub = await Subscription.findOne({ hashedValue: hashedValue });
    if (sub) {
      if (sub.expiration_date < new Date()) {
        return res.status(404).json({ message: "Subscription expired" });
      } else {
        return res.status(200).json({ message: "Subscription active" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await Subscription.findByIdAndDelete(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
