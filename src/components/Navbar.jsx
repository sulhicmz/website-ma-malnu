import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ logoText, navItems, ctaText }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">{logoText}</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.subItems ? (
                  <>
                    <button className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300 flex items-center">
                      {item.label}
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      {item.subItems.map((subItem, subIndex) => (
                        <a 
                          key={subIndex} 
                          href={subItem.href} 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <a 
                    href={item.href} 
                    className="text-gray-700 font-medium hover:text-blue-600 transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button and Mobile Menu Button */}
          <div className="flex items-center">
            <a 
              href="#" 
              className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              {ctaText}
            </a>
            <button 
              onClick={toggleMenu}
              className="md:hidden ml-4 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#" 
            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {ctaText}
          </a>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logoText: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
    subItems: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired
    }))
  })).isRequired,
  ctaText: PropTypes.string.isRequired
};

export default Navbar;