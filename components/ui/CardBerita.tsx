import Link from 'next/link'
import { Calendar, User } from 'lucide-react'

interface CardBeritaProps {
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  slug: string
  imageUrl?: string
}

export default function CardBerita({
  title,
  excerpt,
  date,
  author,
  category,
  slug,
  imageUrl
}: CardBeritaProps) {
  // Format tanggal
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {imageUrl && (
        <div className="relative">
          <img 
            className="w-full h-48 object-cover" 
            src={imageUrl} 
            alt={title} 
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {category}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6 flex-col flex-grow">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <time dateTime={date}>{formattedDate}</time>
          <span className="mx-2">•</span>
          <User className="h-4 w-4 mr-1" />
          <span>{author}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          href={`/berita/${slug}`} 
          className="inline-flex items-center text-green-700 font-medium hover:text-green-900 mt-auto"
        >
          Baca Selengkapnya
          <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}