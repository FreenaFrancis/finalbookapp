const CartModel = require('../models/Cart');

// Add book to cart
const AddtoCart = async (req, res) => {
  const { userId, bookId, quantity } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      const bookIndex = cart.books.findIndex(b => b.bookId.toString() === bookId);
      if (bookIndex > -1) {
        cart.books[bookIndex].quantity += quantity;
      } else {
        cart.books.push({ bookId, quantity });
      }
    } else {
      cart = new CartModel({ userId, books: [{ bookId, quantity }] });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).send('Error adding to cart');
  }
};

// Get cart items for a user
const GetCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId }).populate('books.bookId');
    if (!cart) {
      return res.status(404).send('Cart not found');
    }
    res.json(cart);
  } catch (error) {
    res.status(500).send('Error fetching cart');
  }
};

// Remove book from cart
const removeCart = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      cart.books = cart.books.filter(b => b.bookId.toString() !== bookId);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).send('Cart not found');
    }
  } catch (error) {
    res.status(500).send('Error removing from cart');
  }
};



// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// order
// routes/cart.js



module.exports = { AddtoCart, GetCart, removeCart };
