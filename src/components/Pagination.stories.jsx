import React, { useState } from 'react';
import Pagination from './Pagination';

const PaginationStories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pagination Stories</h1>
      <div className="max-w-4xl mx-auto">
        <p className="mb-4">Current page: {currentPage}</p>
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default PaginationStories;