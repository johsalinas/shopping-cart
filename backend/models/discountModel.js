import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  brand: {
    type: String,
  },
  threshold: {
    type: Number,
  },
  discount: {
    type: Number,
  },
});

const Discount = mongoose.model("discount", discountSchema);

export default Discount;
