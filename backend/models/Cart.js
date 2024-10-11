const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a user model
    required: true
  },
  books: [{
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book', // Reference to the Book model
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
});

const CartModel = mongoose.model('Cart', cartSchema);
module.exports = CartModel;
