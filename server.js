const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const homeRoutes = require("./routes/home");
const dbConnect = require("./config/dbConnect");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/home", homeRoutes);

app.listen(process.env.PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
