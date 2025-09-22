'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Camera } from 'lucide-react'

interface GalleryItem {
  id: string
  title: string
  imageUrl: string
  date: string
  category: string
}

export default function GallerySection() {
  // Sample gallery data
  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'Perayaan Hari Santri Nasional',
      imageUrl: '/images/gallery/santri-nasional.jpg',
      date: '2024-10-22',
      category: 'Kegiatan Sekolah'
    },
    {
      id: '2',
      title: 'Juara Olimpiade Matematika',
      imageUrl: '/images/gallery/juara-olimpiade.jpg',
      date: '2024-10-15',
      category: 'Prestasi'
    },
    {
      id: '3',
      title: 'Kegiatan Ekstrakurikuler Pramuka',
      imageUrl: '/images/gallery/pramuka.jpg',
      date: '2024-10-10',
      category: 'Ekstrakurikuler'
    },
    {
      id: '4',
      title: 'Laboratorium Komputer Modern',
      imageUrl: '/images/gallery/lab-komputer.jpg',
      date: '2024-10-05',
      category: 'Fasilitas'
    },
    {
      id: '5',
      title: 'Upacara Bendera Rutin',
      imageUrl: '/images/gallery/upacara-bendera.jpg',
      date: '2024-09-30',
      category: 'Kegiatan Sekolah'
    },
    {
      id: '6',
      title: 'Pameran Karya Seni Siswa',
      imageUrl: '/images/gallery/pameran-seni.jpg',
      date: '2024-09-25',
      category: 'Ekstrakurikuler'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Galeri Kegiatan
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Dokumentasi kegiatan dan prestasi siswa-siswi MA Malnu Kananga
          </motion.p>
        </div>

        <motion.div 
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="aspect-w-16 aspect-h-9">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center text-sm text-green-300 mb-2">
                  <Camera className="h-4 w-4 mr-1" />
                  <span>{item.category}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(item.date).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}</span>
                </div>
                
                <h3 className="text-xl font-bold">{item.title}</h3>
                
                <div className="mt-4 flex items-center text-green-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Lihat Galeri</span>
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/galeri"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors"
          >
            Lihat Semua Galeri
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}