'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, CheckCircle, Clock, Users, BookOpen, Award } from 'lucide-react'

interface ProgressStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  status: 'completed' | 'current' | 'pending'
  estimatedTime?: string
}

export default function StudentProgress() {
  const [progress, setProgress] = useState(65)
  const [currentStep, setCurrentStep] = useState(3)
  const [achievements, setAchievements] = useState([
    { id: 'first_login', name: 'Pendaftaran Dimulai', icon: '🚀', description: 'Anda memulai pendaftaran', unlocked: true },
    { id: 'profile_started', name: 'Data Diri', icon: '👤', description: 'Mengisi data pribadi', unlocked: true },
    { id: 'document_uploaded', name: 'Dokumen Lengkap', icon: '📄', description: 'Mengupload semua dokumen', unlocked: true },
    { id: 'forms_completed', name: 'Formulir Selesai', icon: '✅', description: 'Menyelesaikan semua formulir', unlocked: false },
    { id: 'early_bird', name: 'Early Bird', icon: '🐦', description: 'Mendaftar di periode awal', unlocked: true }
  ])

  const steps: ProgressStep[] = [
    {
      id: 1,
      title: 'Data Pribadi',
      description: 'Lengkapi informasi identitas diri',
      icon: <Users className="w-5 h-5" />,
      status: 'completed',
      estimatedTime: '5 menit'
    },
    {
      id: 2,
      title: 'Data Orang Tua',
      description: 'Informasi orang tua/wali',
      icon: <Users className="w-5 h-5" />,
      status: 'completed',
      estimatedTime: '5 menit'
    },
    {
      id: 3,
      title: 'Asal Sekolah',
      description: 'Data sekolah asal',
      icon: <BookOpen className="w-5 h-5" />,
      status: 'current',
      estimatedTime: '3 menit'
    },
    {
      id: 4,
      title: 'Pilihan Jurusan',
      description: 'Pilih jurusan IPA/IPS',
      icon: <BookOpen className="w-5 h-5" />,
      status: 'pending',
      estimatedTime: '2 menit'
    },
    {
      id: 5,
      title: 'Upload Dokumen',
      description: 'Upload dokumen pendukung',
      icon: <Award className="w-5 h-5" />,
      status: 'pending',
      estimatedTime: '10 menit'
    },
    {
      id: 6,
      title: 'Konfirmasi',
      description: 'Review dan submit pendaftaran',
      icon: <CheckCircle className="w-5 h-5" />,
      status: 'pending',
      estimatedTime: '2 menit'
    }
  ]

  useEffect(() => {
    // Animate progress on mount
    const timer = setTimeout(() => {
      setProgress(65)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white'
      case 'current': return 'bg-blue-500 text-white animate-pulse'
      case 'pending': return 'bg-gray-300 text-gray-600'
    }
  }

  const getStatusIcon = (status: ProgressStep['status']) => {
    switch (status) {
      case 'completed': return '✓'
      case 'current': return <Clock className="w-3 h-3 animate-spin" />
      case 'pending': return ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Progress Pendaftaran Anda</h2>
        <p className="text-gray-600">Lacak perkembangan pendaftaran PPDB Anda</p>
      </div>

      {/* Overall Progress Circle */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200">
            <div 
              className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-green-500 transition-all duration-1000 ease-out"
              style={{
                clipPath: `polygon(0 0, ${progress * 3.2}% 0, ${progress * 3.2}% 100%, 0 100%)`
              }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">{progress}%</span>
              <p className="text-xs text-gray-600">Selesai</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Statistik Pendaftaran</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-600">Formulir Selesai</p>
              <p className="text-xl font-bold text-green-700">2/6</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-600">Dokumen Diupload</p>
              <p className="text-xl font-bold text-blue-700">3/5</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-600">Waktu Tersisa</p>
              <p className="text-xl font-bold text-yellow-700">5 hari</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-purple-600">Pencapaian</p>
              <p className="text-xl font-bold text-purple-700">4/5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Langkah Pendaftaran</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)} transition-all duration-300`}>
                {step.status === 'completed' ? (
                  '✓'
                ) : step.status === 'current' ? (
                  <Clock className="w-4 h-4 animate-spin" />
                ) : (
                  step.id
                )}
              </div>
              
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className={`font-medium ${
                      step.status === 'completed' ? 'text-green-700' :
                      step.status === 'current' ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div className="text-right">
                    {step.estimatedTime && (
                      <p className="text-xs text-gray-500">~{step.estimatedTime}</p>
                    )}
                    {step.status === 'current' && (
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Lanjutkan →
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className={`ml-5 w-0.5 h-8 ${
                  steps[index + 1].status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pencapaian Anda</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`text-center p-4 rounded-lg border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 bg-gray-50 opacity-60'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h4 className={`text-sm font-medium ${
                achievement.unlocked ? 'text-green-700' : 'text-gray-500'
              }`}>
                {achievement.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
              {achievement.unlocked && (
                <div className="mt-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Langkah Selanjutnya</h3>
        <div className="space-y-2">
          <div className="flex items-center text-blue-800">
            <ChevronRight className="w-4 h-4 mr-2" />
            <span>Lengkapi data asal sekolah (sedang berlangsung)</span>
          </div>
          <div className="flex items-center text-blue-700">
            <ChevronRight className="w-4 h-4 mr-2" />
            <span>Pilih jurusan IPA atau IPS</span>
          </div>
          <div className="flex items-center text-blue-700">
            <ChevronRight className="w-4 h-4 mr-2" />
            <span>Upload dokumen pendukung (ijazah, rapor, dll)</span>
          </div>
        </div>
        
        <div className="mt-4 flex gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Lanjutkan Pendaftaran
          </button>
          <button className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-6 py-2 rounded-lg transition-colors">
            Simpan Progress
          </button>
        </div>
      </div>
    </div>
  )
}