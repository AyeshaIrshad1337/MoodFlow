'use client'

import { useState } from 'react'
import Link from 'next/link'
import { UserMenu } from './UserMenu'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                <span className="text-xl">🎵</span>
              </div>
              <span className="text-2xl font-bold">MoodFlow</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/dashboard" className="hover:text-purple-300 transition-colors">
                  Dashboard
                </Link>
                <Link href="/journeys" className="hover:text-purple-300 transition-colors">
                  Journeys
                </Link>
                <Link href="/favorites" className="hover:text-purple-300 transition-colors">
                  Favorites
                </Link>
                <Link href="/analytics" className="hover:text-purple-300 transition-colors">
                  Analytics
                </Link>
              </nav>
              
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>
    </div>
  )
}