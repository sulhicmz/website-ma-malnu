'use client'

import { useState } from 'react'

interface SkeletonCardProps {
  lines?: number
  showImage?: boolean
}

export default function SkeletonCard({ lines = 3, showImage = true }: SkeletonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {showImage && (
        <div className="bg-gray-300 h-48 w-full"></div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <div className="bg-gray-300 h-4 w-16 rounded mr-2"></div>
          <div className="bg-gray-300 h-4 w-20 rounded"></div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
          {Array.from({ length: lines - 1 }).map((_, i) => (
            <div key={i} className="bg-gray-300 h-4 w-full rounded"></div>
          ))}
        </div>
        
        <div className="bg-gray-300 h-4 w-24 rounded"></div>
      </div>
    </div>
  )
}

export function SkeletonHero() {
  return (
    <div className="relative bg-gradient-to-r from-green-800 to-green-900 overflow-hidden animate-pulse">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="bg-gray-300 h-12 w-3/4 rounded"></div>
            <div className="bg-gray-300 h-6 w-full rounded"></div>
            <div className="bg-gray-300 h-6 w-2/3 rounded"></div>
            <div className="flex space-x-4">
              <div className="bg-gray-300 h-12 w-32 rounded"></div>
              <div className="bg-gray-300 h-12 w-32 rounded"></div>
            </div>
          </div>
          <div className="bg-gray-300 h-96 rounded-2xl"></div>
        </div>
      </div>
    </div>
  )
}