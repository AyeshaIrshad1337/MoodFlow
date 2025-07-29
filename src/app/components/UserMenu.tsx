'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function UserMenu() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    // In a real app, you'd clear the session
    setIsOpen(false)
    router.push('/')
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-500"
        aria-label="User menu"
      >
        <span className="text-white font-medium">A</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-64 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl z-50">
            <div className="p-4 border-b border-white/10">
              <div className="font-medium">Alex Johnson</div>
              <div className="text-sm text-gray-400">alex.johnson@example.com</div>
            </div>
            
            <div className="py-2">
              <Link 
                href="/dashboard"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span>📊</span>
                  <span>Dashboard</span>
                </div>
              </Link>
              <Link 
                href="/journeys"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span>🎵</span>
                  <span>My Journeys</span>
                </div>
              </Link>
              <Link 
                href="/favorites"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span>❤️</span>
                  <span>Favorites</span>
                </div>
              </Link>
              <Link 
                href="/analytics"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span>📈</span>
                  <span>Analytics</span>
                </div>
              </Link>
              <Link 
                href="/profile"
                className="block px-4 py-3 text-sm hover:bg-white/5 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span>⚙️</span>
                  <span>Profile Settings</span>
                </div>
              </Link>
            </div>
            
            <div className="border-t border-white/10 py-2">
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span>🚪</span>
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}