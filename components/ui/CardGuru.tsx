import { Star } from 'lucide-react'

interface CardGuruProps {
  name: string
  position: string
  subject?: string
  rating?: number
  reviewCount?: number
  bio?: string
  imageUrl?: string
  slug: string
}

export default function CardGuru({
  name,
  position,
  subject,
  rating = 0,
  reviewCount = 0,
  bio,
  imageUrl,
  slug
}: CardGuruProps) {
  // Render stars based on rating
  const renderStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      )
    }
    return stars
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="p-6 flex-col flex-grow">
        <div className="flex items-center">
          {imageUrl ? (
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={imageUrl}
              alt={name}
            />
          ) : (
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-green-800 font-bold text-xl">
                {name.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="ml-4">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            <p className="text-green-700">{position}</p>
            {subject && (
              <p className="text-sm text-gray-600">{subject}</p>
            )}
            
            {rating > 0 && (
              <div className="flex items-center mt-1">
                <div className="flex">
                  {renderStars()}
                </div>
                <span className="ml-1 text-sm text-gray-600">
                  {rating.toFixed(1)} ({reviewCount} ulasan)
                </span>
              </div>
            )}
          </div>
        </div>
        
        {bio && (
          <div className="mt-4">
            <p className="text-gray-600 text-sm line-clamp-3">
              {bio}
            </p>
          </div>
        )}
        
        <div className="mt-6">
          <a
            href={`/guru-staf/${slug}`}
            className="inline-flex justify-center items-center px-4 py-2 border border-green-700 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 transition-colors w-full"
          >
            Lihat Profil
          </a>
        </div>
      </div>
    </div>
  )
}