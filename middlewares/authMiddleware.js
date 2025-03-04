const jwt = require("jsonwebtoken");
exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.admintoken;
  if (!token) {
    return res.redirect("/api/auth/login");
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
};
