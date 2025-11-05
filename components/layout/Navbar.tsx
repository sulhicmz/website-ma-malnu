'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Profil', href: '/profil' },
    { name: 'Akademik', href: '/akademik' },
    { name: 'Berita', href: '/berita' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Guru & Staf', href: '/guru-staf' },
    { name: 'PPDB', href: '/ppdb' },
    { name: 'Kontak', href: '/kontak' },
  ]

return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}
      role="navigation"
      aria-label="Navigasi utama"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="bg-primary-700 text-white font-bold text-xl w-10 h-10 flex items-center justify-center rounded">
                MA
              </div>
              <span className="ml-3 text-xl font-bold text-primary-800 hidden sm:block">MA Malnu Kananga</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
<Link 
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-2 py-1"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center">
<Link 
              href="/ppdb/daftar"
              className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Daftar Sekarang
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/ppdb/daftar"
              className="block w-full mt-4 mx-3 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-primary-700 hover:bg-primary-800 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}