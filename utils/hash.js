const crypto = require("crypto");

function generateHash(key1, key2) {
  const hash = crypto.createHash("sha256");
  hash.update(key1 + key2);
  return hash.digest("hex");
}

module.exports = generateHash;
