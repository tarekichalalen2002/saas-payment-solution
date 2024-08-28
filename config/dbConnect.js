const { default: mongoose } = require("mongoose");
const dbConnect = () => {
  const uri = process.env.REMOTE_DB_URI;
  try {
    mongoose.set('strictQuery', false);
    const conn = mongoose.connect(uri,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    })
    .then(
      () => {
        console.log("Database connected");
      })
  } catch (error) {
    console.log("Database error");
  }
};
module.exports = dbConnect;