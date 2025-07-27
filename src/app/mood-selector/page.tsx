'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MoodSelector } from '../components/MoodSelector'

export default function MoodSelectorPage() {
  const router = useRouter()
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood)
    setTimeout(() => {
      router.push(`/player?mood=${mood}`)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
            <h1 className="text-2xl font-bold">MoodFlow</h1>
          </div>
          <Link 
            href="/"
            className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            What's your vibe today?
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl">
            Select your mood and let AI craft the perfect musical journey.
          </p>
        </div>

        <MoodSelector onMoodSelect={handleMoodSelect} />
        
        {selectedMood && (
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/10">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">
                Starting your {selectedMood} journey...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}