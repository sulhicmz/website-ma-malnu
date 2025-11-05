'use client'

import { useState, useEffect } from 'react'

interface SkipLinkProps {
  targetId: string
  children: React.ReactNode
}

export default function SkipLink({ targetId, children }: SkipLinkProps) {
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocused(true)
      }
    }

    const handleMouseDown = () => {
      setIsFocused(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className={`
        sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
        focus:bg-white focus:text-green-700 focus:px-4 focus:py-2 focus:rounded-md 
        focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500
        transition-all duration-200
        ${isFocused ? 'opacity-100' : 'opacity-0'}
      `}
    >
      {children}
    </a>
  )
}