// // import { useState, useContext, createContext, useEffect } from "react";

// // // Creating the CartContext
// // const CartContext = createContext();

// // // Creating a provider for CartContext
// // const CartProvider = ({ children }) => {
// //   const [cart, setCart] = useState([]);

// //   // Load cart from localStorage when the app starts
// //   useEffect(() => {
// //     const existingCartItem = localStorage.getItem("cart");
// //     if (existingCartItem) {
// //       setCart(JSON.parse(existingCartItem));
// //     }
// //   }, []);

// //   // Save the cart to localStorage when cart state changes
// //   useEffect(() => {
// //     localStorage.setItem("cart", JSON.stringify(cart));
// //   }, [cart]);

// //   return (
// //     <CartContext.Provider value={{ cart, setCart }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // // Custom hook for using Cart context
// // const useCart = () => useContext(CartContext);

// // export { CartProvider, useCart };
// import { useState, useContext, createContext, useEffect } from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// // Creating the CartContext
// const CartContext = createContext();

// // Creating a provider for CartContext
// const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const navigate = useNavigate();

//   // Fetch cart from backend
//   useEffect(() => {
//     const fetchCart = async () => {
//       const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
//       if (!userId) {
//         console.error('User not logged in, no userId found');
//         navigate('/login'); // Redirect to login if no userId
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:5000/api/cart/${userId}`);
//         setCart(response.data.books); // Assuming response data has 'books' array
//       } catch (error) {
//         console.error("Error fetching cart", error);
//       }
//     };

//     fetchCart();
//   }, [navigate]);

//   // Add item to cart
  // const addToCart = async (bookId, quantity) => {
  //   const userId = localStorage.getItem('userId');
  //   if (!userId) {
  //     console.error('User not logged in');
  //     navigate('/login');
  //     return;
  //   }

  //   try {
  //     const response = await axios.post('http://localhost:5000/api/cart/addToCart', {
  //       userId,
  //       bookId,
  //       quantity
  //     });
  //     setCart(response.data.books); // Update cart after adding an item
  //   } catch (error) {
  //     console.error("Error adding to cart", error);
  //   }
  // };

//   // Remove item from cart
//   const removeFromCart = async (bookId) => {
//     const userId = localStorage.getItem('userId');
//     if (!userId) {
//       console.error('User not logged in');
//       navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/cart/removeFromCart', {
//         userId,
//         bookId
//       });
//       setCart(response.data.books); // Update cart after removing an item
//     } catch (error) {
//       console.error("Error removing from cart", error);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Custom hook for using Cart context
// const useCart = () => useContext(CartContext);

// export { CartProvider, useCart };
