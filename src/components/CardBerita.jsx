import React from 'react';
import PropTypes from 'prop-types';

const CardBerita = ({ category, date, title, excerpt, imageUrl, imageAlt }) => {
  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={imageAlt} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-500 ml-3">
            {date}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>
        <a href="#" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
          Baca selengkapnya
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

CardBerita.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired
};

export default CardBerita;