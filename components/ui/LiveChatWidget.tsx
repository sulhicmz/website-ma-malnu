'use client'

import { useState, useEffect } from 'react'

interface LiveChatMessage {
  id: number
  text: string
  sender: 'user' | 'support'
  timestamp: Date
}

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<LiveChatMessage[]>([
    {
      id: 1,
      text: 'Halo! Selamat datang di MA Malnu Kananga. Ada yang bisa kami bantu?',
      sender: 'support',
      timestamp: new Date()
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate incoming message after 10 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: 'Butuh bantuan informasi PPDB? Kami siap membantu!',
          sender: 'support',
          timestamp: new Date()
        }])
        setUnreadCount(prev => prev + 1)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [isOpen])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: LiveChatMessage = {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, userMessage])
      setNewMessage('')
      
      // Simulate support response
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const supportResponses = [
          'Terima kasih atas pesan Anda. Tim kami akan segera merespons.',
          'Untuk informasi PPDB, Anda dapat mengunjungi halaman /ppdb',
          'Kami akan bantu Anda dengan informasi yang dibutuhkan.',
          'Silakan tinggalkan nomor WhatsApp, kami akan hubungi segera.'
        ]
        
        const randomResponse = supportResponses[Math.floor(Math.random() * supportResponses.length)]
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: randomResponse,
          sender: 'support',
          timestamp: new Date()
        }])
      }, 1500)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${isOpen ? 'w-80 h-96' : 'w-auto h-auto'}`}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true)
            setUnreadCount(0)
          }}
          className="relative bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          aria-label="Buka live chat"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
          </svg>
          
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
          
          <span className="absolute -bottom-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            Butuh Bantuan?
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col h-full">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Support PPDB</h3>
              <div className="flex items-center text-xs">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                <span>Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-200 transition-colors"
              aria-label="Tutup chat"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-green-200' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ketik pesan Anda..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Respon rata-rata: 2-3 menit
            </div>
          </div>
        </div>
      )}
    </div>
  )
}