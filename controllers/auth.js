const path = require("path");
const jwt = require("jsonwebtoken");

exports.loginPage = async (req, res) => {
  res.sendFile(path.join(__dirname, "../views/auth", "index.html"));
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.USERNAME_ADMIN &&
    password === process.env.PASSWORD
  ) {
    const admintoken = jwt.sign(
      { username, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    console.log(admintoken);
    res.cookie("admintoken", admintoken, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
