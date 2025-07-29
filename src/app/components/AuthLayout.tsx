'use client'

import Link from 'next/link'

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Simple header for auth pages */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🎵</span>
              </div>
              <span className="text-2xl font-bold">MoodFlow</span>
            </Link>
            
            <div className="flex gap-4">
              <Link 
                href="/login"
                className="px-6 py-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-all"
              >
                Log in
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  )
}