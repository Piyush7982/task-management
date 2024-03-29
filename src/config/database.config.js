const mongoose = require("mongoose");
require("dotenv").config();
async function connect() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {});
    console.log("Database Connection successfully!!!");
  } catch (error) {
    console.log("failed to connect to database!!!", error);
    return;
  }
}
module.exports = { connect };
