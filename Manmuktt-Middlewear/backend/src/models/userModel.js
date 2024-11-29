const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
