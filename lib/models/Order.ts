import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: String,
  email: String,
  products: [
    {
      name: String,
      color: String,
      size: String,
      quantity: Number,
    },
  ],
  phoneNumber: Number,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
