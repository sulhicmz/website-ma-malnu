'use client'

import { motion } from 'framer-motion'
import { BookOpen, Users, Wifi, Utensils, Dumbbell, Microscope, Laptop, Music } from 'lucide-react'

export default function FacilitySection() {
  const facilities = [
    {
      icon: <BookOpen className="h-10 w-10" />,
      title: "Perpustakaan Digital",
      description: "Koleksi buku dan jurnal elektronik yang lengkap untuk mendukung proses belajar mengajar"
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Ruang Kelas Ber-AC",
      description: "Ruang kelas yang nyaman dengan fasilitas pendingin udara untuk kenyamanan belajar"
    },
    {
      icon: <Wifi className="h-10 w-10" />,
      title: "WiFi Campus",
      description: "Akses internet cepat di seluruh area kampus untuk mendukung pembelajaran digital"
    },
    {
      icon: <Utensils className="h-10 w-10" />,
      title: "Kantin Sehat",
      description: "Kantin yang menyediakan makanan bergizi dan sehat untuk siswa dan guru"
    },
    {
      icon: <Dumbbell className="h-10 w-10" />,
      title: "Lapangan Olahraga",
      description: "Fasilitas olahraga yang lengkap untuk mendukung kegiatan ekstrakurikuler"
    },
    {
      icon: <Microscope className="h-10 w-10" />,
      title: "Laboratorium IPA",
      description: "Laboratorium biologi, fisika, dan kimia yang lengkap dengan peralatan modern"
    },
    {
      icon: <Laptop className="h-10 w-10" />,
      title: "Lab Komputer",
      description: "Laboratorium komputer dengan spesifikasi tinggi untuk pembelajaran teknologi"
    },
    {
      icon: <Music className="h-10 w-10" />,
      title: "Studio Musik",
      description: "Studio musik profesional untuk mengembangkan bakat seni siswa"
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
            Fasilitas Unggulan Kami
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            MA Malnu Kananga menyediakan fasilitas modern yang mendukung proses pembelajaran yang optimal
          </motion.p>
        </div>

        <motion.div 
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-700">
                {facility.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">{facility.title}</h3>
              <p className="mt-2 text-gray-600">{facility.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Masih Butuh Informasi Lebih Lanjut?
                </h3>
                <p className="mt-2 max-w-3xl text-gray-600">
                  Jelajahi seluruh fasilitas kami secara virtual atau kunjungi langsung kampus kami untuk melihat fasilitas secara langsung.
                </p>
              </div>
              
              <div className="mt-8 md:mt-0 md:w-1/3 flex flex-col sm:flex-row md:flex-col gap-4">
                <a
                  href="/profil/fasilitas"
                  className="inline-block rounded-md border border-transparent bg-green-700 px-8 py-4 text-base font-medium text-white hover:bg-green-800 transition-colors text-center"
                >
                  Lihat Semua Fasilitas
                </a>
                <a
                  href="/kontak"
                  className="inline-block rounded-md border border-green-700 bg-white px-8 py-4 text-base font-medium text-green-700 hover:bg-green-50 transition-colors text-center"
                >
                  Jadwalkan Kunjungan
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}