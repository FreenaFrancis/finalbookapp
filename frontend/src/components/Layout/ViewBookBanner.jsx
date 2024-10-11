import React from 'react'

function ViewBookBanner() {
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

    
      
    </div>
    </div>
  )
}

export default ViewBookBanner