import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';  // Importing avatar icon

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null); // State to store userId
  const [bookId, setBookId] = useState(null); // State to store bookId (if required)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('UserId');
    const storedBookId = localStorage.getItem('bookId'); // Retrieve bookId (if needed)
    
    if (token) {
      setIsLoggedIn(true);
      setUserId(storedUserId); // Set userId in state
      setBookId(storedBookId); // Set bookId in state if available
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('UserId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-gray-800 hover:text-gray-600">
            BookStore
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800 transition duration-200">
            Home
          </Link>
          <Link to="/viewbooks" className="text-gray-600 hover:text-gray-800 transition duration-200">
            All Books
          </Link>
          <Link to={userId ? `/order/${userId}` : '#'} className="text-gray-600 hover:text-gray-800 transition duration-200">
            My Order
          </Link>
          <Link to={bookId ? `/cart/${bookId}` : '#'} className="text-gray-600 hover:text-gray-800 transition duration-200">
            Cart
          </Link>
        </div>

        {/* Desktop Auth Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"  // Profile link
                className="text-gray-600 hover:text-gray-800 transition duration-200"
              >
                <FaUserCircle size={24} className="text-gray-600" /> {/* Avatar icon */}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-800 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-800 transition duration-200">
                Login
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-800 transition duration-200">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-gray-600 focus:outline-none"
            aria-label="toggle menu"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <Link
            to="/"
            className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
          >
            Home
          </Link>
          <Link
            to="/viewbooks"
            className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
          >
            All Books
          </Link>
          <Link
            to={userId ? `/order/${userId}` : '#'}
            className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
          >
            My Order
          </Link>
          <Link
            to={bookId ? `/cart/${bookId}` : '#'}
            className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
          >
            Cart
          </Link>
          <Link
            to="/profile"  // Mobile Profile Link
            className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
          >
            <FaUserCircle size={20} className="inline-block mr-2" /> Profile {/* Avatar icon */}
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-600 hover:text-gray-800 transition duration-200 px-4 py-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;
