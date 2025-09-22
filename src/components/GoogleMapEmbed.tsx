// components/GoogleMapEmbed.tsx
'use client'

import { useEffect, useState } from 'react'

interface GoogleMapEmbedProps {
  address: string
  title?: string
  className?: string
  height?: string
}

export default function GoogleMapEmbed({
  address,
  title = 'Lokasi Sekolah',
  className = '',
  height = '400px'
}: GoogleMapEmbedProps) {
  const [mapUrl, setMapUrl] = useState('')
  
  useEffect(() => {
    // Encode the address for URL
    const encodedAddress = encodeURIComponent(address)
    // Generate the Google Maps embed URL
    const url = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodedAddress}`
    setMapUrl(url)
  }, [address])
  
  return (
    <div className={`relative ${className}`}>
      <iframe
        title={title}
        src={mapUrl}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-lg shadow-md"
      ></iframe>
      <noscript>
        <p className="text-gray-600">
          Peta interaktif tidak dapat ditampilkan karena JavaScript dinonaktifkan. 
          Anda dapat melihat lokasi di <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Google Maps
          </a>.
        </p>
      </noscript>
    </div>
  )
}