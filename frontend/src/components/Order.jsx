// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const OrderHistory = () => {
//   const { id } = useParams();
//   const [orders, setOrders] = useState([]);

//   // Get userId from local storage
//   const userId = localStorage.getItem('UserId');
//   const token = localStorage.getItem('Token');

//   useEffect(() => {
//     if (userId) {
//       const fetchOrders = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/orders/order/${userId}`);
//           setOrders(response.data);
//         } catch (error) {
//           console.error('Error fetching orders', error);
//         }
//       };
//       fetchOrders();
//     }
//   }, [userId]);

//   if (orders.length === 0) return <div className="text-center text-gray-600">No orders found</div>;

//   return (
//     <div className="container mx-auto mt-8 px-4">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>
//       <div className="overflow-x-auto">
//         {orders.map((order) => (
//           <div key={order._id} className="mb-8">
//             <h3 className="text-xl font-semibold mb-4">Order #{order._id}</h3>
//             <p className="text-gray-600 mb-2">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//             <p className="text-gray-600 mb-4">Total Price: ${order.totalPrice}</p>

//             <table className="min-w-full bg-white shadow-md rounded-lg">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//                   <th className="py-3 px-6 text-left">Book</th>
//                   <th className="py-3 px-6 text-left">Author</th>
//                   <th className="py-3 px-6 text-center">Quantity</th>
//                   <th className="py-3 px-6 text-center">Price</th>
//                   <th className="py-3 px-6 text-center">Total</th>
//                 </tr>
//               </thead>
//               <tbody className="text-gray-700 text-sm">
//                 {order.books.map((item) => {
//                   // Check if bookId is valid
//                   if (!item.bookId) {
//                     return (
//                       <tr key={item._id} className="border-b border-gray-200">
//                         <td className="py-3 px-6" colSpan="5">Book not available</td>
//                       </tr>
//                     );
//                   }

//                   return (
//                     <tr key={item.bookId._id} className="border-b border-gray-200">
//                       <td className="py-3 px-6 flex items-center">
//                         <img
//                           src={`http://localhost:5000/images/${item.bookId.image}`}
//                           alt={item.bookId.bookname}
//                           className="w-12 h-16 mr-4 object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src = '/placeholder.png';
//                           }}
//                         />
//                         <span>{item.bookId.bookname}</span>
//                       </td>
//                       <td className="py-3 px-6">{item.bookId.author}</td>
//                       <td className="py-3 px-6 text-center">{item.quantity}</td>
//                       <td className="py-3 px-6 text-center">${item.bookId.price}</td>
//                       <td className="py-3 px-6 text-center">${(item.bookId.price * item.quantity).toFixed(2)}</td>
//                       <button>Cancel</button>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OrderHistory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderHistory = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem('UserId');

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/orders/order/${userId}`);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders', error);
        }
      };
      fetchOrders();
    }
  }, [userId]);

  const handleCancelOrder = async (orderId) => {
    const userId = localStorage.getItem('UserId'); // Get userId from local storage
    console.log("Cancelling Order ID:", orderId);
    try {
      const response = await axios.post(`http://localhost:5000/api/orders/cancelOrder/${orderId}`, { userId });
      console.log(response.data.message);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'Canceled' } : order
        )
      );
    } catch (error) {
      console.error('Error canceling the order', error);
    }
  };

  if (orders.length === 0) return <div className="text-center text-gray-600">No orders found</div>;

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>
      <div className="overflow-x-auto">
        {orders.map((order) => (
          <div key={order._id} className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Order #{order._id}</h3>
            <p className="text-gray-600 mb-2">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            <p className="text-gray-600 mb-4">Total Price: ${order.totalPrice}</p>
            <p className={`text-sm mb-4 ${order.status === 'Canceled' ? 'text-red-500' : 'text-green-500'}`}>
              Status: {order.status}
            </p>

            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Book</th>
                  <th className="py-3 px-6 text-left">Author</th>
                  <th className="py-3 px-6 text-center">Quantity</th>
                  <th className="py-3 px-6 text-center">Price</th>
                  <th className="py-3 px-6 text-center">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {order.books.map((item) => (
                  <tr key={item.bookId._id} className="border-b border-gray-200">
                    <td className="py-3 px-6 flex items-center">
                      <img
                        src={`http://localhost:5000/images/${item.bookId.image}`}
                        alt={item.bookId.bookname}
                        className="w-12 h-16 mr-4 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/placeholder.png';
                        }}
                      />
                      <span>{item.bookId.bookname}</span>
                    </td>
                    <td className="py-3 px-6">{item.bookId.author}</td>
                    <td className="py-3 px-6 text-center">{item.quantity}</td>
                    <td className="py-3 px-6 text-center">${item.bookId.price}</td>
                    <td className="py-3 px-6 text-center">${(item.bookId.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {order.status !== 'Canceled' && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
