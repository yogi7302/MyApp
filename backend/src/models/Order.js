import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  cartItems: Array,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
