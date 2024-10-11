import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Layout/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure you imported this

function ViewBook() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All'); // State for selected category
  const navigate = useNavigate();

  useEffect(() => {
    // Debugging toast to see if it's working on component mount
    toast.info("Welcome to the Book List!", { position: "top-right" });

    // Fetch books from the server
    axios.get('http://localhost:5000/api/book/getBook')
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data); // Initialize filteredBooks with all books
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Filter books based on selected category
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) => book.category === selectedCategory);
      setFilteredBooks(filtered);
    }
  }, [selectedCategory, books]);

  const addToCart = async (bookId, quantity) => {
    const userId = localStorage.getItem('UserId');
    if (!userId) {
      console.error('User not logged in');
      toast.error("You need to be logged in to add items to the cart", { position: "top-right" });
      return;
    }
  
    try {
      console.log('Add to Cart button clicked'); // Add this line to debug
      await axios.post('http://localhost:5000/api/cart/addToCart', {
        userId,
        bookId,
        quantity,
      });
      alert("item added to cart")
      toast.success("Item added to cart", { position: "top-right" }); // Success toast message
      navigate(`/cart/${bookId}`);
    } catch (error) {
      console.error('Error adding to cart', error);
      toast.error("Error adding item to cart", { position: "top-right" }); // Error toast message
    }
  };
  

  const categories = ['All', 'Fiction', 'Novel', 'Non-Fiction', 'Science', 'History'];

  return (
    <>
      {/* ToastContainer for displaying toast alerts */}
      <ToastContainer />

      {/* Banner */}
      <div className="bg-gray-900 text-white min-h-full flex flex-col items-center justify-center">
        <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between px-8 py-16" style={{ height: '800px' }}>
          <div className="text-center lg:text-left space-y-6 lg:w-1/2">
            <h1 className="text-5xl font-bold p-8 text-yellow-500">Welcome to Our Books<br />An heaven for book lovers</h1>
            <div className="mt-4 flex items-center justify-center lg:justify-start p-8">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Enter title"
                  className="w-full pl-10 pr-4 py-3 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <button className="absolute right-0 top-0 h-full px-6 bg-yellow-500 text-black font-bold rounded-full transition hover:bg-yellow-600">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgUneaNuedHtj6S1uJlgD_F8GIRH8N2QMEQ&s"
              alt="Books"
              className="w-96 h-96 object-cover rounded-full shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* View Books */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg font-medium ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-500 hover:text-white transition duration-200`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Display Filtered Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book._id} className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: '250px' }}>
                <img 
                  src={`http://localhost:5000/images/${book.image}`} 
                  alt={book.bookname}
                  className="h-64 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">{book.bookname}</h2>
                  <p className="text-gray-800 font-bold">Price: ${book.price}</p>
                </div>
                <div className="flex justify-between items-center p-4">
                  <button 
                    onClick={() => addToCart(book._id, 1)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Add to Cart
                  </button>
                  <a 
                    href={`/details/${book._id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-600">No books found in this category.</p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ViewBook;
