'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Users, Award, BookOpen } from 'lucide-react'

export default function PPDBHighlight() {
  const features = [
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Tahun Ajaran 2024/2025",
      description: "Penerimaan peserta didik baru untuk tahun ajaran 2024/2025 telah dibuka"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Kuota Terbatas",
      description: "Tersedia kuota terbatas untuk jurusan IPA dan IPS"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Beasiswa Tersedia",
      description: "Beasiswa prestasi bagi siswa berprestasi"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Kurikulum Terbaik",
      description: "Kurikulum nasional yang terintegrasi dengan nilai-nilai keislaman"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Penerimaan Peserta Didik Baru
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Bergabunglah dengan MA Malnu Kananga dan jadilah bagian dari generasi unggul yang beriman dan bertaqwa
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-700">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 bg-gradient-to-r from-green-700 to-green-900 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  Pendaftaran PPDB 2024/2025 Telah Dibuka!
                </h3>
                <p className="mt-2 max-w-3xl text-green-100">
                  Segera daftarkan putra/putri Anda di MA Malnu Kananga. Nikmati pendidikan berkualitas dengan biaya terjangkau.
                </p>
                
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">800+</p>
                    <p className="text-sm text-green-100">Kuota Tersedia</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">Gratis</p>
                    <p className="text-sm text-green-100">Pendaftaran</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">2</p>
                    <p className="text-sm text-green-100">Jurusan</p>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-3">
                    <p className="text-2xl font-bold text-white">Beasiswa</p>
                    <p className="text-sm text-green-100">Tersedia</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 md:mt-0 md:w-1/3 flex justify-center">
                <Link
                  href="/ppdb/daftar"
                  className="inline-block rounded-md border border-transparent bg-white px-8 py-4 text-base font-medium text-green-700 hover:bg-green-50 transition-colors shadow-lg"
                >
                  Daftar Sekarang
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600">
            Punya pertanyaan tentang PPDB?{' '}
            <Link href="/kontak" className="font-medium text-green-700 hover:text-green-900">
              Hubungi kami
            </Link>{' '}
            atau kunjungi halaman{' '}
            <Link href="/ppdb" className="font-medium text-green-700 hover:text-green-900">
              informasi PPDB
            </Link>{' '}
            untuk detail lebih lanjut.
          </p>
        </motion.div>
      </div>
    </section>
  )
}