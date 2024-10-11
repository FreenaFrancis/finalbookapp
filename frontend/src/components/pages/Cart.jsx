
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import Footer from '../Layout/Footer';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0); // To store total price
//   const userId = localStorage.getItem('UserId');
//   const token = localStorage.getItem('token');
//   const bookId=localStorage.getItem('bookId')
//   console.log(bookId);
  
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Fetch Cart Data
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/cart/getCart/${userId}`)
//       .then((res) => {
//         setCart(res.data.books);
//         calculateTotal(res.data.books); // Calculate total on cart fetch
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [userId]);

//   // Calculate total price of the cart
//   const calculateTotal = (cartItems) => {
//     const total = cartItems.reduce(
//       (acc, item) => acc + (item.bookId?.price || 0) * item.quantity, // Safely access bookId.price
//       0
//     );
//     setTotalPrice(total);
//   };

//   // Remove item from cart
//   const removeFromCart = (bookId) => {
//     axios
//       .post(`http://localhost:5000/api/cart/removeFromCart`, { userId }) // Use POST to send data in body
//       .then(() => {
//         const updatedCart = cart.filter(item => item.bookId?._id !== bookId); // Safely access bookId._id
//         setCart(updatedCart);
//         calculateTotal(updatedCart); // Recalculate total after item removal
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // // Handle checkout
//   // const handleCheckout = () => {
//   //   axios
//   //     .post(`http://localhost:5000/api/orders/checkout`, { userId })
//   //     .then((res) => {
//   //       console.log('Order placed successfully:', res.data);
//   //       setCart([]); // Clear cart after successful checkout
//   //       setTotalPrice(0); // Reset total price
//   //       navigate(`/order/${userId}`);
//   //     })
//   //     .catch((err) => {
//   //       console.log('Error during checkout:', err);
//   //     });
//   // };

//   // Cart.js
// const handleCheckout = () => {
//   axios
//       .post(`http://localhost:5000/api/orders/checkout`, { userId})
//       .then((res) => {
//           console.log('Order placed successfully:', res.data);
//           setCart([]); // Clear cart after successful checkout
//           setTotalPrice(0); // Reset total price
//           navigate(`/order/${userId}`);
//       })
//       .catch((err) => {
//           console.error('Error during checkout:', err.response ? err.response.data : err); // Log the error response
//       });
// };


//   return (
//     <>
//     <div className="container mx-auto mt-8 px-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
//       {cart.length === 0 ? (
//         <p className="text-gray-600">No items in cart.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cart.map((item) => (
//             // Ensure that bookId and image exist before rendering
//             item.bookId && (
//               <div key={item.bookId._id} className="bg-white shadow-md rounded-lg overflow-hidden">
//                 <img
//                   className="w-full h-48 object-cover"
//                   src={`http://localhost:5000/images/${item.bookId.image || 'placeholder.png'}`} // Fallback to placeholder if image is null
//                   alt={item.bookId.bookname}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/placeholder.png'; // Fallback image in case of error
//                   }}
//                 />
//                 <div className="p-4">
//                   <h3 className="text-xl font-semibold mb-2">{item.bookId.bookname}</h3>
//                   <p className="text-gray-600 mb-4">Price: ${item.bookId.price} x {item.quantity}</p>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => removeFromCart(item.bookId._id)}
//                       className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
//                     >
//                       Remove
//                     </button>
//                     <button
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
//                     >
//                       Buy Now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )
//           ))}
//         </div>
//       )}
//       <div className="mt-8">
//         <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
//         {cart.length > 0 && (
//           <button
//             onClick={handleCheckout}
//             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Checkout
//           </button>
//         )}
//       </div>
//     </div>
//    <div style={{paddingTop:'50px'}}>
//    <Footer/>
//    </div>
//     </>
//   );
// };

// export default Cart;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { toast, ToastContainer } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const userId = localStorage.getItem('UserId');
  const token = localStorage.getItem('token');
  const bookId = localStorage.getItem('bookId');
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch Cart Data
  useEffect(() => {
    // toast.success("Item added to cart", { position: "top-right" }); 
    axios
      .get(`http://localhost:5000/api/cart/getCart/${userId}`)
      .then((res) => {
        setCart(res.data.books);
        calculateTotal(res.data.books);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  // Calculate total price of the cart
  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + (item.bookId?.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Remove item from cart
  const removeFromCart = (bookId) => {
    axios
      .post(`http://localhost:5000/api/cart/removeFromCart`, { userId })
      .then(() => {
        const updatedCart = cart.filter(item => item.bookId?._id !== bookId);
        setCart(updatedCart);
        calculateTotal(updatedCart);
        toast.success("Item removed from cart", { position: "top-right" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Handle checkout
  const handleCheckout = () => {
    axios
      .post(`http://localhost:5000/api/orders/checkout`, { userId })
      .then((res) => {
        console.log('Order placed successfully:', res.data);
        setCart([]);
        setTotalPrice(0);
        navigate(`/order/${userId}`);
      })
      .catch((err) => {
        console.error('Error during checkout:', err.response ? err.response.data : err);
      });
  };

  // Open Modal for confirmation
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <ToastContainer/>
      <div className="container mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">No items in cart.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              item.bookId && (
                <div key={item.bookId._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={`http://localhost:5000/images/${item.bookId.image || 'placeholder.png'}`}
                    alt={item.bookId.bookname}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder.png';
                    }}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{item.bookId.bookname}</h3>
                    <p className="text-gray-600 mb-4">Price: ${item.bookId.price} x {item.quantity}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => removeFromCart(item.bookId._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                      >
                        Remove
                      </button>
                      <button
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}
        <div className="mt-8">
          <h3 className="text-xl font-bold">Total: ${totalPrice}</h3>
          {cart.length > 0 && (
            <button
              onClick={openModal} // Open modal on checkout
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
      
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Checkout</h2>
            <p className="mb-6">Are you sure you want to proceed with the checkout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleCheckout();
                  closeModal(); // Close modal after checkout
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ paddingTop: '50px' }}>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
