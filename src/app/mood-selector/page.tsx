'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MoodSelector } from '../components/MoodSelector'
import { Layout } from '../components/Layout'

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
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
     
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
    </Layout>
  )
}