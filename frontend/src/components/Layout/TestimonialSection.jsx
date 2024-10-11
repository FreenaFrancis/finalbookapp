import React, { useState } from 'react';
// import './TestimonialSlider.css'; // Create this CSS file for styling

const testimonials = [
  {
    text: "I've never felt so at home in a bookstore. The personalized recommendations and the cozy atmosphere make every visit a special experience. It's the perfect place for any book lover.",
    name: 'Jenny Wilson',
    location: 'La Plata',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    text: "This bookstore isn't just a place to buy books; it's a community hub where my love for reading is truly celebrated. The staff's passion for books shines through in everything they do.",
    name: 'Robert Fox',
    location: 'New York',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    text: "Every time I visit this store, I discover something new. The selection and the welcoming environment make it the perfect place to indulge in my love for reading.",
    name: 'Sarah Anderson',
    location: 'California',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
];

function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <h2 className="title">Our Client’s Say</h2>
      <p className="description">
        Whether you’re looking for your next great read or simply want to hear what others have to say, our client testimonials offer a glimpse into the profound impact our books have on their lives.
      </p>
      <div className="slider">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
          >
            {index === currentIndex && (
              <div className="testimonial-content">
                <p className="text">"{testimonial.text}"</p>
                <div className="user-info">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="avatar"
                  />
                  <div className="details">
                    <p className="name">{testimonial.name}</p>
                    <p className="location">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={prevSlide} className="prev">←</button>
        <button onClick={nextSlide} className="next">→</button>
      </div>
      {/* Display current slide number */}
      <div className="slide-indicator">
        {currentIndex + 1}/{testimonials.length}
      </div>
    </div>
  );
}

export default TestimonialSlider;
