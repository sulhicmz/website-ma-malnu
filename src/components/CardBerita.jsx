import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

const CardBerita = ({ category, date, title, excerpt, imageUrl, imageAlt, slug }) => {
  return (
    <article className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-200 overflow-hidden relative">
        <Image 
          src={imageUrl} 
          alt={imageAlt} 
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>
<div className="p-6">
        <header className="flex items-center mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <time dateTime={date} className="text-xs text-gray-500 ml-3">
            {date}
          </time>
        </header>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {excerpt}
        </p>
        <footer>
          <a 
            href={`/berita/${slug}`} 
            className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label={`Baca selengkapnya tentang ${title}`}
          >
            Baca selengkapnya
            <svg 
              className="w-4 h-4 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </footer>
      </div>
    </article>
  );
};

CardBerita.propTypes = {
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default CardBerita;