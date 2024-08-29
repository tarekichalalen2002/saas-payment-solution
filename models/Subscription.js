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
  used: {
    type: Boolean,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashedValue: {
    type: String,
  },
});

module.exports = require("mongoose").model("Subscription", subscriptionScheme);
