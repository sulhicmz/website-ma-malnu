'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CardBerita from '@/components/ui/CardBerita'

interface BeritaItem {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  slug: string
  imageUrl?: string
}

export default function NewsSection() {
  // Sample data - in real implementation, this would come from CMS
  const beritaItems: BeritaItem[] = [
    {
      id: '1',
      title: 'Perayaan Hari Santri Nasional di MA Malnu Kananga',
      excerpt: 'MA Malnu Kananga menyelenggarakan perayaan Hari Santri Nasional dengan serangkaian kegiatan yang memperingati jasa para santri dalam mempertahankan NKRI.',
      date: '2024-10-22',
      author: 'Admin MA Malnu',
      category: 'Kegiatan Sekolah',
      slug: 'perayaan-hari-santri-nasional',
      imageUrl: '/images/sample-news-1.jpg'
    },
    {
      id: '2',
      title: 'Juara Olimpiade Matematika Tingkat Provinsi',
      excerpt: 'Tim olimpiade matematika MA Malnu Kananga berhasil meraih juara kedua dalam ajang Olimpiade Matematika tingkat provinsi. Prestasi membanggakan bagi sekolah.',
      date: '2024-10-15',
      author: 'Dra. Hj. Siti Aminah, M.Pd.',
      category: 'Prestasi',
      slug: 'juara-olimpiade-matematika-provinsi',
      imageUrl: '/images/sample-news-2.jpg'
    },
    {
      id: '3',
      title: 'Pelatihan Keterampilan Bagi Guru Madrasah',
      excerpt: 'Dinas Pendidikan menyelenggarakan pelatihan keterampilan digital bagi guru madrasah se-Kabupaten Kananga. MA Malnu Kananga turut berpartisipasi aktif.',
      date: '2024-10-10',
      author: 'Drs. Bambang Sutrisno, M.Pd.',
      category: 'Pengembangan Guru',
      slug: 'pelatihan-keterampilan-guru-madrasah',
      imageUrl: '/images/sample-news-3.jpg'
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
            Berita & Pengumuman
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Ikuti informasi terkini seputar kegiatan dan prestasi MA Malnu Kananga
          </motion.p>
        </div>

        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {beritaItems.map((item) => (
            <CardBerita
              key={item.id}
              title={item.title}
              excerpt={item.excerpt}
              date={item.date}
              author={item.author}
              category={item.category}
              slug={item.slug}
              imageUrl={item.imageUrl}
            />
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
            href="/berita"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-700 hover:bg-green-800 transition-colors"
          >
            Lihat Semua Berita
            <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}