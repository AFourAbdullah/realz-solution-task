const mongoose = require("mongoose");
const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo db connected to ${data.connection.host}`);
    });
};
module.exports = connectDB;
