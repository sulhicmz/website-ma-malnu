import React from 'react';
import PropTypes from 'prop-types';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex py-4 px-4 bg-white rounded-lg shadow-sm" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index < items.length - 1 ? (
              <>
                <a 
                  href={item.href} 
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  {item.label}
                </a>
                <svg 
                  className="mx-2 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </>
            ) : (
              <span className="text-gray-600 font-medium text-sm">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string
  })).isRequired
};

export default Breadcrumb;