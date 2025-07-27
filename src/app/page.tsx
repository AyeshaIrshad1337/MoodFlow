'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
            <span className="text-2xl font-bold">MoodFlow</span>
          </div>
          
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
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mt-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-violet-400">
                Emotional Music
              </span>
              <br />
              <span className="text-white">Journey</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Experience music that adapts to your emotions. AI-powered emotional journey through sound.
            </p>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/mood-selector"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all text-lg font-semibold hover:scale-105 shadow-lg text-center"
              >
                Start Your Journey
              </Link>
              <button className="px-8 py-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-all text-lg font-semibold">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          {[
            { title: "AI Emotion Analysis", desc: "Real-time mood detection", icon: "🧠" },
            { title: "Smart Transitions", desc: "Seamless musical flow", icon: "🔄" },
            { title: "Journey Tracking", desc: "Personal emotional insights", icon: "📊" }
          ].map((card, index) => (
            <div 
              key={index}
              className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}