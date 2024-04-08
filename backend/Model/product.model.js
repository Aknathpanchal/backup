const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  quantity: Number,
});

var Product = mongoose.model("product", productSchema);

module.exports = Product;
