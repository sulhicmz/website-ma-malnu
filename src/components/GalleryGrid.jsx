import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const GalleryGrid = ({ images, columns }) => {
  const gridClasses = `grid gap-4 ${columns === 1 ? 'grid-cols-1' : 
                              columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 
                              columns === 3 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 
                              columns === 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 
                              'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'}`;

  return (
    <section className={gridClasses} aria-label="Image gallery">
      {images.map((image, index) => (
        <article key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="h-48 bg-gray-200 overflow-hidden relative">
            <Image 
              src={image.src} 
              alt={image.alt} 
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover"
              loading={index < 4 ? 'eager' : 'lazy'}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
            />
          </div>
          {image.caption && (
            <footer className="p-4 bg-white">
              <p className="text-gray-700 text-sm">{image.caption}</p>
            </footer>
          )}
        </article>
      ))}
    </section>
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