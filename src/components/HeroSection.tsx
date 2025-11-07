'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-green-800 to-green-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Membentuk Generasi Unggul yang{' '}
              <span className="text-yellow-400">Beriman</span> dan{' '}
              <span className="text-yellow-400">Bertaqwa</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-xl text-green-100 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Madrasah Aliyah Negeri Malnu Kananga menyelenggarakan pendidikan berkualitas yang mengintegrasikan nilai-nilai keislaman dengan kurikulum nasional.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                href="/ppdb/daftar"
                className="px-8 py-4 border border-transparent text-base font-medium rounded-md text-green-800 bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300"
              >
                Daftar PPDB 2024/2025
              </Link>
              
              <Link
                href="/profil"
                className="px-8 py-4 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Jelajahi Sekolah
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">800+</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Siswa Aktif</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">50+</span>
                </div>
<div className="ml-3">
                  <p className="text-sm font-medium">Guru Berpengalaman</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-green-700 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Jurusan</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Image/Illustration */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96 md:h-[500px]" />
              
              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-yellow-400 opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-green-600 opacity-20"></div>
              
              {/* Floating Cards */}
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-xl p-4 w-48"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0118 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Akreditasi A</p>
                    <p className="text-xs text-gray-500">BAN-SM</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -left-6 bg-white rounded-lg shadow-xl p-4 w-40"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Juara 1</p>
                    <p className="text-xs text-gray-500">Olimpiade</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}