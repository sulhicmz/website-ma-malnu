import React from 'react';
import PropTypes from 'prop-types';

const GalleryGrid = ({ images, columns }) => {
  const gridClasses = `grid gap-4 ${columns === 1 ? 'grid-cols-1' : 
                              columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 
                              columns === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 
                              columns === 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 
                              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`;

  return (
    <div className={gridClasses}>
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-gray-200 overflow-hidden">
            <img 
              src={image.src} 
              alt={image.alt} 
              className="w-full h-full object-cover"
            />
          </div>
          {image.caption && (
            <div className="p-4 bg-white">
              <p className="text-gray-700 text-sm">{image.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

GalleryGrid.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string
  })).isRequired,
  columns: PropTypes.number
};

GalleryGrid.defaultProps = {
  columns: 3
};

export default GalleryGrid;