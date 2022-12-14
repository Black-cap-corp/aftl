const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Successfully connect to database");
    })
    .catch((e) => {
      console.error("database connection failed. existing now");
      console.error(e);
      process.exit(1);
    });
};
