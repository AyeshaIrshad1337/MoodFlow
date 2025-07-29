'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { JourneyService } from '../lib/journey-service'
import { Journey } from '../types/journey'
import { Layout } from '../components/Layout'

export default function JourneysPage() {
  const router = useRouter()
  const [journeys, setJourneys] = useState<Journey[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadJourneys()
  }, [])

  const loadJourneys = async () => {
    try {
      const userJourneys = await JourneyService.getUserJourneys('user123')
      setJourneys(userJourneys)
    } catch (error) {
      console.error('Failed to load journeys:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const filteredJourneys = filter === 'all' 
    ? journeys 
    : journeys.filter(journey => journey.mood === filter)

  const moodFilters = ['all', 'calm', 'energetic', 'happy', 'reflective', 'focused', 'romantic']

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
       
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Journeys</h1>
          <p className="text-gray-400">All your emotional music experiences in one place</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {moodFilters.map((mood) => (
              <button
                key={mood}
                onClick={() => setFilter(mood)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === mood
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600'
                    : 'bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5'
                }`}
              >
                {mood === 'all' ? 'All Journeys' : mood.charAt(0).toUpperCase() + mood.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Journeys List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : filteredJourneys.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎵</div>
            <h3 className="text-xl font-bold mb-2">No journeys yet</h3>
            <p className="text-gray-400 mb-6">Start your first emotional music journey</p>
            <Link 
              href="/mood-selector"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold"
            >
              Start New Journey
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJourneys.map((journey) => (
              <div 
                key={journey.id}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                onClick={() => router.push(`/journey/${journey.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold capitalize mb-1">{journey.mood} Journey</h3>
                    <p className="text-gray-400 text-sm">
                      {formatDate(journey.startDate)} • {formatDuration(journey.duration)}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    journey.completed 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {journey.completed ? 'Completed' : 'In Progress'}
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex -space-x-2">
                    {journey.songs.slice(0, 4).map((song, index) => (
                      <div 
                        key={index} 
                        className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-800"
                      >
                        <img 
                          src={song.imageUrl} 
                          alt={song.title}
                          className="w-12 h-12"
                        />
                      </div>
                    ))}
                    {journey.songs.length > 4 && (
                      <div className="w-12 h-12 rounded-lg bg-black/50 flex items-center justify-center text-xs border-2 border-gray-800">
                        +{journey.songs.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{journey.songs.length} songs</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}