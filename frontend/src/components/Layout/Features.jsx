import React from 'react';

function Features() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center p-8 my-11 space-y-8 md:space-y-0 md:space-x-12">
      {/* Image Section */}
      <div className="flex-shrink-0">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.gYbxvRI4RBNe5IRhsOsN0AHaFY&pid=Api&P=0&h=180"
          alt="Author of the Month"
          className="w-full md:w-[600px] h-auto rounded-tl-[180px] rounded-tr-[180px] shadow-lg"
        />
      </div>

      {/* Text Section */}
      <div className="max-w-xl space-y-4">
        <p className="text-yellow-500 font-semibold uppercase tracking-wide">
          Best Author of the Month
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Cameron Williamson</h1>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum iure debitis impedit voluptas. Neque tenetur debitis eos accusamus odit enim autem sed veniam perspiciatis nesciunt? Aperiam culpa nostrum dolorum consequatur?
        </p>
        <blockquote className="italic text-gray-700 border-l-4 border-yellow-500 pl-4">
          "Each story is a piece of heart, crafted with love and care to share with readers who seek adventure, emotion, and connection. I hope my words resonate with you and leave a lasting impact."
        </blockquote>
      </div>
    </div>
  );
}

export default Features;
