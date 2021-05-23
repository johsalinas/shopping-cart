import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  brand: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const product = mongoose.model("product", productSchema);

export default product;
