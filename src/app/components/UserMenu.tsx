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
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center"
      >
        <span className="text-white font-medium">A</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl z-20">
            <div className="p-4 border-b border-white/10">
              <div className="font-medium">Alex Johnson</div>
              <div className="text-sm text-gray-400">alex.johnson@example.com</div>
            </div>
            
            <div className="py-2">
              <Link 
                href="/dashboard"
                className="block px-4 py-2 text-sm hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Profile Settings
              </Link>
              <Link 
                href="/journeys"
                className="block px-4 py-2 text-sm hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                My Journeys
              </Link>
            </div>
            
            <div className="border-t border-white/10 py-2">
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}