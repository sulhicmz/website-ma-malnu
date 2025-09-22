// src/app/[slug]/error.tsx
'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Terjadi Kesalahan</h2>
          <p className="text-gray-700 mb-6">
            Maaf, terjadi kesalahan saat memuat halaman.
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Coba Lagi
          </button>
          <a 
            href="/" 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    </div>
  )
}