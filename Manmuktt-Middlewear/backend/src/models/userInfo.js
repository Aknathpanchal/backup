const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const userInfoSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  ageRange: { type: String, required: true },
  gender: { type: String, required: true }
});

const userInfoModal = mongoose.model("userInfo", userInfoSchema);

module.exports = userInfoModal;