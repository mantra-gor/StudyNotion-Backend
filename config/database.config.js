const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connection to Database is Successfully Done ✅"))
    .catch((error) => {
      console.log("Error while connecting to Database ❌");
      console.error(error);
      process.exit(1);
    });
};
