'use client'

import { useState, useCallback } from 'react'

interface FormFieldProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
  placeholder?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
}

export default function FormField({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  error,
  value,
  onChange,
  onBlur
}: FormFieldProps) {
  const [touched, setTouched] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleBlur = useCallback(() => {
    setTouched(true)
    setFocused(false)
    onBlur?.()
  }, [onBlur])

  const handleFocus = useCallback(() => {
    setFocused(true)
  }, [])

  const showError = touched && error

  const baseClasses = `
    w-full px-4 py-3 border rounded-lg transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
    ${showError 
      ? 'border-red-500 bg-red-50' 
      : focused 
        ? 'border-green-500 bg-green-50' 
        : 'border-gray-300 bg-white'
    }
  `

  return (
    <div className="space-y-2">
      <label 
        htmlFor={name}
        className={`
          block text-sm font-medium transition-colors duration-200
          ${showError ? 'text-red-700' : focused ? 'text-green-700' : 'text-gray-700'}
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          rows={4}
          className={baseClasses}
          aria-describedby={showError ? `${name}-error` : undefined}
          aria-invalid={showError}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={baseClasses}
          aria-describedby={showError ? `${name}-error` : undefined}
          aria-invalid={showError}
        />
      )}
      
      {showError && (
        <p 
          id={`${name}-error`}
          className="text-sm text-red-600 mt-1 flex items-center"
          role="alert"
        >
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {focused && !showError && (
        <p className="text-sm text-green-600 mt-1">
          {type === 'email' ? 'Format: email@contoh.com' : 
           type === 'tel' ? 'Format: 08xx-xxxx-xxxx' : 
           'Isi field ini dengan benar'}
        </p>
      )}
    </div>
  )
}

// Validation utilities
export const validateEmail = (email: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'Format email tidak valid'
  }
}

export const validatePhone = (phone: string): string | undefined => {
  const phoneRegex = /^08[0-9]{8,12}$/
  const cleanPhone = phone.replace(/[-\s]/g, '')
  if (!phoneRegex.test(cleanPhone)) {
    return 'Format nomor telepon tidak valid (08xx-xxxx-xxxx)'
  }
}

export const validateRequired = (value: string, fieldName: string): string | undefined => {
  if (!value.trim()) {
    return `${fieldName} wajib diisi`
  }
}