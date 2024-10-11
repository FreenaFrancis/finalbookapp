// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function ViewDetails() {
//   const { id } = useParams(); // Destructure id from useParams
//   const [book, setBook] = useState(null); // Use null initially since you're fetching one book
// const navigate=useNavigate()
//   useEffect(() => {
//     // Fetch book by ID
//     axios.get(`http://localhost:5000/api/book/getBookById/${id}`)
//       .then((response) => {
//         setBook(response.data); // Set the book data
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, [id]); // Use `id` as the dependency

//   // Conditional rendering to wait for book data
//   if (!book) {
//     return <p className="text-center text-gray-500 text-xl mt-10">Loading...</p>; // Display a loading message while data is being fetched
//   }

//   const addToCart = async (bookId, quantity) => {
//     const userId = localStorage.getItem('UserId');
//     console.log(userId, bookId);

//     if (!userId) {
//       console.error('User not logged in');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/cart/addToCart', {
//         userId,
//         bookId,
//         quantity,
//       });
//       navigate(`/cart/${bookId}`);
//     } catch (error) {
//       console.error('Error adding to cart', error);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
//         <div className="md:w-1/3">
//           <img 
//             className="object-cover w-full h-96"
//             src={`http://localhost:5000/images/${book.image}`} 
//             alt={book.bookname}
//           />
//         </div>
//         <div className="md:w-2/3 p-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.bookname}</h1>
//           <p className="text-lg text-gray-700 mb-2">Author: <span className="font-semibold">{book.author}</span></p>
//           <p className="text-lg text-gray-700 mb-4">Price: <span className="text-green-600 font-bold">${book.price}</span></p>

//           <div className="mb-4">
//             <p className="text-gray-600">Published Date: <span className="font-medium">{book.publishDate}</span></p>
//             <p className="text-gray-600">Publisher: <span className="font-medium">{book.publisher}</span></p>
//             <p className="text-gray-600">Pages: <span className="font-medium">{book.pages}</span></p>
//           </div>

//           <div className="flex space-x-4 mt-6">
//           <button 
//                 onClick={() => addToCart(books._id, 1)}
//                 className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200"
//               >
//                 Add to Cart
//               </button>
//             <button 
//               className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
//             >
//               Buy Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ViewDetails;
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Layout/Footer';

function ViewDetails() {
  const { id } = useParams(); // Destructure id from useParams
  const [book, setBook] = useState(null); // Use null initially since you're fetching one book
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch book by ID
    axios
      .get(`http://localhost:5000/api/book/getBookById/${id}`)
      .then((response) => {
        setBook(response.data); // Set the book data
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Use `id` as the dependency

  // Conditional rendering to wait for book data
  if (!book) {
    return <p className="text-center text-gray-500 text-xl mt-10">Loading...</p>; // Display a loading message while data is being fetched
  }

  const addToCart = async (bookId, quantity) => {
    const userId = localStorage.getItem('UserId');
    console.log(userId, bookId);

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart/addToCart', {
        userId,
        bookId,
        quantity,
      });
      navigate(`/cart/${bookId}`);
    } catch (error) {
      console.error('Error adding to cart', error);
    }
  };

  return (
    <>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/3">
          <img 
            className="object-cover w-full h-96"
            src={`http://localhost:5000/images/${book.image}`} 
            alt={book.bookname}
          />
        </div>
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.bookname}</h1>
          <p className="text-lg text-gray-700 mb-2">
            Author: <span className="font-semibold">{book.author}</span>
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Price: <span className="text-green-600 font-bold">${book.price}</span>
          </p>

          <div className="mb-4">
            <p className="text-gray-600">
              Published Date: <span className="font-medium">{book.publishDate}</span>
            </p>
            <p className="text-gray-600">
              Publisher: <span className="font-medium">{book.publisher}</span>
            </p>
            <p className="text-gray-600">
              Pages: <span className="font-medium">{book.pages}</span>
            </p>
            <p className="text-gray-600">
              Description: <span className="font-medium">{book.description}</span>
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => addToCart(book._id, 1)} 
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200"
            >
              Add to Cart
            </button>
            {/* <button
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              Buy Now
            </button> */}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ViewDetails;
