const path = require("path");
const Subscription = require("../models/Subscription");
const generateHash = require("../utils/hash");

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
  const { code, hashKey } = req.body;
  if (!code || !hashKey) {
    return res.status(400).json({ message: "Please provide code and hashKey" });
  }
  try {
    const subscription = await Subscription.findOne({ code: code });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    if (subscription.hashedValue) {
      return res.status(400).json({ message: "Subscription already used" });
    }
    const hashedValue = generateHash(code, hashKey);
    subscription.hashedValue = hashedValue;
    await subscription.save();
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkSubscription = async (req, res) => {
  const { code, hashKey } = req.body;
  if (!code || !hashKey) {
    return res.status(400).json({ message: "Please provide code and hashKey" });
  }
  try {
    const sub = await Subscription.findOne({ code: code });
    if (!sub) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    if (!sub.hashedValue) {
      return res.status(400).json({ message: "Subscription not used yet" });
    }
    if (sub.hashedValue !== generateHash(code, hashKey)) {
      return res
        .status(400)
        .json({ message: "You are trying to connect through a new device" });
    }
    if (sub.expiration_date < new Date()) {
      return res.status(400).json({ message: "Subscription expired" });
    }
    res.status(200).json({ message: "Subscription is valid" });
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
