import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GetAllorders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders/getallorders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []); // Add an empty dependency array to run this effect once when the component mounts

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-100 to-green-100 min-h-screen" style={{marginLeft:'230px',marginTop:'-650px'}}>
      <h1 className="text-3xl font-bold text-center mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-4 border-b">Order ID</th>
              <th className="py-3 px-4 border-b">Book IDs</th>
              <th className="py-3 px-4 border-b">User ID</th>
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Total Price</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{order._id}</td>
                <td className="py-2 px-4 border-b">
                  <ul>
                    {order.books.map((book) => (
                      // Ensure book.bookId is not null before accessing _id
                      book.bookId ? <li key={book.bookId._id}>{book.bookId._id}</li> : <li key={book._id}>No Book Data</li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-4 border-b">{order.userId}</td>
                <td className="py-2 px-4 border-b">{order.quantity}</td>
                <td className="py-2 px-4 border-b">{order.totalPrice}</td>
                <td className="py-2 px-4 border-b">{order.status}</td>
                <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAllorders;
