import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  date: string
  category?: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  itemsPerRow?: number
}

export default function GalleryGrid({ items, itemsPerRow = 3 }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  // Handle keyboard events for lightbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }

  return (
    <>
      <div 
        className="grid gap-4"
        style={{
          gridTemplateColumns: `repeat(${itemsPerRow}, minmax(0, 1fr))`
        }}
      >
        {items.map((item, index) => (
          <div 
            key={item.id}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer aspect-square"
            onClick={() => openLightbox(index)}
          >
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-center p-4">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm mt-1">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              onClick={closeLightbox}
              aria-label="Tutup galeri"
            >
              <X className="h-8 w-8" />
            </button>
            
            <button
              className="absolute left-4 text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              onClick={goToPrevious}
              aria-label="Gambar sebelumnya"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              className="absolute right-4 text-white p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              onClick={goToNext}
              aria-label="Gambar selanjutnya"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            
            <div className="max-w-4xl max-h-full">
              <img
                src={items[currentImageIndex].imageUrl}
                alt={items[currentImageIndex].title}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-xl font-bold">{items[currentImageIndex].title}</h3>
                <p className="text-gray-300 mt-1">{items[currentImageIndex].date}</p>
                <p className="text-gray-400 text-sm mt-2">
                  {currentImageIndex + 1} dari {items.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}