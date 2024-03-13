const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
  },
  orderedDate: {
    type: String,
  },
  amount: {
    type: Number,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: {
      values: ["pending", "approved", "completed"],
      message: "Status must be: pending, approved or completed",
    },
  },
  orderedBooks: [{
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  }],
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
