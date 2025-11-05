import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  hasNextPage,
  hasPrevPage
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const delta = 2 // Number of pages to show before and after current page
    const range = []
    const rangeWithDots = []

    // Always include first page
    range.push(1)

    // Add dots and pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    // Always include last page
    if (totalPages > 1) {
      range.push(totalPages)
    }

    // Add dots where needed
    let lastItem = 0
    for (const page of range) {
      if (page - lastItem === 2) {
        // Add single page
        rangeWithDots.push(lastItem + 1)
      } else if (page - lastItem !== 1) {
        // Add dots
        rangeWithDots.push('...')
      }
      rangeWithDots.push(page)
      lastItem = page
    }

    return rangeWithDots
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6" aria-label="Pagination">
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Menampilkan halaman <span className="font-medium">{currentPage}</span> dari{' '}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>
      
      <div className="flex flex-1 justify-between sm:justify-end">
        {/* Previous Button */}
        {hasPrevPage ? (
          <Link
            href={`${basePath}/page/${currentPage - 1}`}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Sebelumnya
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Sebelumnya
          </span>
        )}

        {/* Page Numbers (Mobile) */}
        <div className="flex sm:hidden">
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>
        </div>

        {/* Next Button */}
        {hasNextPage ? (
          <Link
            href={`${basePath}/page/${currentPage + 1}`}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Selanjutnya
            <ChevronRight className="h-5 w-5 ml-1" />
          </Link>
        ) : (
          <span className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400 cursor-not-allowed">
            Selanjutnya
            <ChevronRight className="h-5 w-5 ml-1" />
          </span>
        )}
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Menampilkan halaman <span className="font-medium">{currentPage}</span> dari{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            {/* Previous */}
            {hasPrevPage ? (
              <Link
                href={`${basePath}/page/${currentPage - 1}`}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 bg-gray-100 cursor-not-allowed">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </span>
            )}

            {/* Page Numbers */}
            {pageNumbers.map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                )
              }

              return (
                <Link
                  key={page}
                  href={page === 1 ? basePath : `${basePath}/page/${page}`}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? 'z-10 bg-green-700 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  }`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </Link>
              )
            })}

            {/* Next */}
            {hasNextPage ? (
              <Link
                href={`${basePath}/page/${currentPage + 1}`}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 bg-gray-100 cursor-not-allowed">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </span>
            )}
          </nav>
        </div>
      </div>
    </nav>
  )
}