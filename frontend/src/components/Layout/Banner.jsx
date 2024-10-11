import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeaf, faSmile, faGraduationCap, faPenNib, faSearch } from '@fortawesome/free-solid-svg-icons';
import TestimonialSection from './TestimonialSection';
import Footer from './Footer';
import Features from './Features';

function Banner() {
  return (
    <div>
    <div className="bg-gray-900 text-white min-h-full flex flex-col items-center justify-center">
      {/* Banner Content */}
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between px-8 py-16" style={{ height: '800px' }}>
        {/* Left Side: Text */}
        <div className="text-center lg:text-left space-y-6 lg:w-1/2">
          <h1 className="text-5xl font-bold p-8">Discover Your Next Great Read</h1>
          <p className="text-lg p-5 py-2">
            Explore captivating narratives and unforgettable characters: Your guide to the best books to add to your reading list.
          </p>

          {/* Search Bar */}
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

        {/* Right Side: Image */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 flex justify-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/10/13/03/prague-980732_1280.jpg"
            alt="Books"
            className="w-96 h-96 object-cover rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Partners/Logos Section */}
      <div className="bg-gray-800 py-10 w-full mt-10">
        <div className="max-w-5xl mx-auto flex justify-around items-center">
          <div className="text-2xl font-bold">Fluid</div>
          <div className="text-2xl font-bold">Jotted</div>
          <div className="text-2xl font-bold">Code</div>
          <div className="text-2xl font-bold">Iconic</div>
          <div className="text-2xl font-bold">Wave</div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-8 py-16">
        <p className="text-xl font-bold" style={{ fontSize: 38, lineHeight: '50px', wordSpacing: '10px' }}>
          Crafting a one-of-a-kind bookstore experience that <br /> shares and celebrates your love for reading.
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold rounded-full transition hover:bg-yellow-600">
          Our Story
        </button>
      </div>

      {/* Book's Top Features Section */}
      
    </div>
    
    <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:space-x-10">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
            <div className="relative rounded-full overflow-hidden w-80 h-80 lg:w-full lg:h-full" >
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.Vle9VO-8KkFbTGmr0stmigHaFj&pid=Api&P=0&h=180https://tse3.mm.bing.net/th?id=OIP.mKDJM7CQ6uI7nuCWDKINhgHaEy&pid=Api&P=0&h=180"
                alt="Library"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Features List */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Book's Top Features</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20">
              {/* Feature 1 */}
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faLeaf} className="text-yellow-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Best quality</h3>
                  <p className="text-gray-600">
                    Discover a curated collection of literary masterpieces, from timeless classics to modern bestsellers.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faSmile} className="text-yellow-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Quick and friendly</h3>
                  <p className="text-gray-600">
                    Our comprehensive resources provide the latest techniques and trends to maximize your growth.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faGraduationCap} className="text-yellow-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Easy to learn</h3>
                  <p className="text-gray-600">
                    Our platform offers easy-to-understand guides on various subjects, making learning accessible.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start space-x-4">
                <FontAwesomeIcon icon={faPenNib} className="text-yellow-500 text-3xl" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Handwritten</h3>
                  <p className="text-gray-600">
                    Discover a unique collection of handwritten letters, notes, and documents, each telling a story.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <TestimonialSection/> */}
      <Features/>
      <Footer/>
    </div>
  );
}

export default Banner;
