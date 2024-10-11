// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending', // Order status, e.g., "pending", "completed", "canceled"
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
