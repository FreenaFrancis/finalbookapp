// routes/order.js
const express = require('express');
const CartModel = require('../models/Cart');
const OrderModel = require('../models/Order');
const BookModel = require('../models/Books');
const router = express.Router();

// // Checkout and place an order
// const checkOut= async (req, res) => {
//   const { userId } = req.body;

//   try {
//     // Find the user's cart
//     const cart = await CartModel.findOne({ userId }).populate('books.bookId');

//     if (!cart || cart.books.length === 0) {
//       return res.status(400).send('Cart is empty');
//     }

//     // Calculate the total price of the books in the cart
//     let totalPrice = 0;
//     cart.books.forEach(item => {
//       totalPrice += item.bookId.price * item.quantity;
//     });

//     // Create a new order
//     const order = new OrderModel({
//       userId,
//       books: cart.books,
//       totalPrice,
//     });

//     // Save the order
//     await order.save();

//     // Clear the cart
//     cart.books = [];
//     await cart.save();

//     res.status(201).json({ message: 'Order placed successfully', order });
//   } catch (error) {
//     res.status(500).json({ error: 'Error placing order' });
//   }
// };


const checkOut = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const cart = await CartModel.findOne({ userId }).populate('books.bookId');

    if (!cart || cart.books.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Filter out items with null bookId
    const validBooks = cart.books.filter(item => item.bookId !== null);
    if (validBooks.length === 0) {
      return res.status(400).json({ error: 'No valid books in the cart' });
    }

    let totalPrice = validBooks.reduce((total, item) => {
      return total + item.bookId.price * item.quantity;
    }, 0);

    const order = new OrderModel({
      userId,
      books: validBooks,
      totalPrice,
    });

    await order.save();

    // Clear the cart after placing the order
    cart.books = [];
    await cart.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({ error: 'Error placing order' });
  }
}

const getOrder=async (req, res) => {
    const { userId } = req.params;
  
    try {
      const orders = await OrderModel.find({ userId }).populate('books.bookId');
      if (!orders || orders.length === 0) {
        return res.status(404).send('No orders found');
      }
      res.json(orders);
    } catch (error) {
      res.status(500).send('Error fetching orders');
    }
  };



  const getallOrders=async(req,res)=>{
    try{
      const orders=await OrderModel.find({}).populate('books.bookId')
      res.json(orders)
      
    }
    catch(err){
      console.log(err);
      
    }
  }


  // cancelorder
  const cancelOrder = async (req, res) => {
    const { userId } = req.body;
    const { orderId } = req.params;
  
    console.log("Attempting to cancel Order ID:", orderId);
    console.log("User ID:", userId); // Log the userId
  
    try {
      const order = await OrderModel.findOne({ _id: orderId, userId });
  
      if (!order) {
        console.log("Order not found or unauthorized for user ID:", userId); // Log this for debugging
        return res.status(404).json({ message: 'Order not found or unauthorized' });
      }
  
      order.status = 'Canceled';
      await order.save();
  
      res.status(200).json({ message: 'Order canceled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error canceling order' });
    }
  };
  
module.exports = {checkOut,getOrder,getallOrders,cancelOrder};
