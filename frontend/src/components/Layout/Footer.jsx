import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Social Media */}
        <div>
          <a href="#" className="text-3xl font-bold text-yellow-500">
            B<span className="text-white">o</span>kx
          </a>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <i className="fab fa-twitter text-white"></i>
            </a>
          </div>
        </div>

        {/* Pages Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Pages</h4>
          <ul>
            <li><a href="#" className="hover:text-white">Home</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Our Books</a></li>
            <li><a href="#" className="hover:text-white">Events</a></li>
          </ul>
        </div>

        {/* Categories Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">All categories</h4>
          <ul>
            <li><a href="#" className="hover:text-white">Programming</a></li>
            <li><a href="#" className="hover:text-white">Financial</a></li>
            <li><a href="#" className="hover:text-white">Business</a></li>
            <li><a href="#" className="hover:text-white">Love Stories</a></li>
            <li><a href="#" className="hover:text-white">History</a></li>
            <li><a href="#" className="hover:text-white">Fantasy</a></li>
            <li><a href="#" className="hover:text-white">Best Sellers</a></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-semibold text-white mb-4">Subscribe to newsletter</h4>
          <p className="mb-4">
            Lorem ipsum dolor sit amet consectetur. Diam felis in nulla tempus eleifend a. Neque dolor nulla augue tristique laoreet.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 p-2 w-full rounded-l-lg focus:outline-none text-gray-300"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 rounded-r-lg"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto mt-10 border-t border-gray-800 pt-4 text-center">
        <p>© Bookx. All Rights Reserved 2024. Licensing</p>
        <p className="text-sm mt-2">Template by WCopilot Powered by Webflow</p>
      </div>
    </footer>
  );
};

export default Footer;
