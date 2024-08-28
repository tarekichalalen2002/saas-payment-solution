const Scheme = require("mongoose").Schema;

const subscriptionScheme = new Scheme({
  full_name: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  used: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  hashKey: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashedValue: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = require("mongoose").model("Subscription", subscriptionScheme);
