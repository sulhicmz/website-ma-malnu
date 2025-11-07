'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  avatar?: string
  rating: number
  date: string
}

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Dra. Hj. Siti Nurhaliza, M.Pd.',
      role: 'Orang Tua Siswa',
      content: 'Saya sangat puas dengan pendidikan yang diberikan MA Malnu Kananga kepada anak saya. Selain akademik yang baik, sekolah ini juga sangat memperhatikan pembentukan akhlak mulia pada para siswa.',
      rating: 5,
      date: '2024-09-15'
    },
    {
      id: '2',
      name: 'Muhammad Rizki Pratama, S.Pd.',
      role: 'Guru Biologi',
      content: 'Bekerja di MA Malnu Kananga adalah pengalaman yang luar biasa. Lingkungan kerja yang kondusif dan dukungan manajemen yang baik membuat kami para guru dapat fokus pada pengembangan kualitas pembelajaran.',
      rating: 5,
      date: '2024-08-22'
    },
    {
      id: '3',
      name: 'Fatimah Azzahra',
      role: 'Alumni Angkatan 2020',
      content: 'MA Malnu Kananga tidak hanya memberikan ilmu yang bermanfaat, tetapi juga membentuk karakter yang kuat. Pengalaman selama 3 tahun di sini sangat berharga bagi perkembangan saya.',
      rating: 5,
      date: '2024-07-30'
    },
    {
      id: '4',
      name: 'Drs. H. Ahmad Sanusi, M.M.',
      role: 'Kepala Sekolah',
      content: 'Komitmen kami terhadap pembentukan generasi unggul yang beriman dan bertaqwa tercermin dalam setiap aspek kehidupan sekolah. Kami terus berinovasi untuk memberikan yang terbaik bagi siswa-siswi kami.',
      rating: 5,
      date: '2024-10-01'
    }
  ]

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-16 bg-gradient-to-r from-green-700 to-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Kata Mereka Tentang Kami
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-xl text-green-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Dengarkan pengalaman langsung dari orang tua siswa, guru, dan alumni kami
          </motion.p>
        </div>

        {/* Desktop Testimonials */}
        <motion.div 
          className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {testimonial.avatar ? (
                    <img className="h-16 w-16 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-800 font-bold text-xl">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-green-700">{testimonial.role}</p>
                  <div className="flex mt-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 relative">
                <Quote className="h-8 w-8 text-green-200 absolute -top-4 -left-2" />
                <p className="text-gray-600 italic pl-6">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                {new Date(testimonial.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Testimonial Carousel */}
        <motion.div 
          className="md:hidden mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {testimonials[currentTestimonial].avatar ? (
                    <img 
                      className="h-16 w-16 rounded-full object-cover" 
                      src={testimonials[currentTestimonial].avatar} 
                      alt={testimonials[currentTestimonial].name} 
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-800 font-bold text-xl">
                        {testimonials[currentTestimonial].name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-900">{testimonials[currentTestimonial].name}</h3>
                  <p className="text-green-700">{testimonials[currentTestimonial].role}</p>
                  <div className="flex mt-1">
                    {renderStars(testimonials[currentTestimonial].rating)}
                  </div>
</div>
              </div>
              
              <div className="mt-6 relative">
                <Quote className="h-8 w-8 text-green-200 absolute -top-4 -left-2" />
                <p className="text-gray-600 italic pl-6">
                  &quot;{testimonials[currentTestimonial].content}&quot;
                </p>
              </div>
              
              <div className="mt-6 text-sm text-gray-500">
                {new Date(testimonials[currentTestimonial].date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
            </div>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 w-3 rounded-full ${currentTestimonial === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
                  aria-label={`Lihat testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-white">800+</div>
            <div className="text-green-100 mt-2">Siswa Aktif</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">50+</div>
            <div className="text-green-100 mt-2">Guru Berpengalaman</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">98%</div>
            <div className="text-green-100 mt-2">Tingkat Kelulusan</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white">15+</div>
            <div className="text-green-100 mt-2">Tahun Berdiri</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}