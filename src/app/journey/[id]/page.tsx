'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function JourneyDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [journey, setJourney] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      // Mock data for demonstration
      const mockJourney = {
        id: params.id,
        userId: 'user123',
        mood: 'calm',
        startDate: '2024-01-15T14:30:00Z',
        endDate: '2024-01-15T15:15:00Z',
        duration: 2700,
        completed: true,
        songs: [
          {
            id: 'song1',
            title: 'Weightless',
            artist: 'Marconi Union',
            album: 'Weightless',
            duration: 480,
            imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=🎵',
            emotionAnalysis: {
              calm: 0.95,
              peaceful: 0.85,
              relaxed: 0.90
            },
            audioFeatures: {
              valence: 0.4,
              energy: 0.2,
              danceability: 0.3
            }
          },
          {
            id: 'song2',
            title: 'Clair de Lune',
            artist: 'Claude Debussy',
            album: 'Classical Essentials',
            duration: 330,
            imageUrl: 'https://placehold.co/300x300/a855f7/white?text=🎹',
            emotionAnalysis: {
              calm: 0.92,
              contemplative: 0.88,
              serene: 0.85
            },
            audioFeatures: {
              valence: 0.35,
              energy: 0.15,
              danceability: 0.2
            }
          }
        ],
        emotionProgression: [
          {
            timestamp: '2024-01-15T14:30:00Z',
            emotions: {
              calm: 0.95,
              peaceful: 0.85
            }
          },
          {
            timestamp: '2024-01-15T14:45:00Z',
            emotions: {
              calm: 0.92,
              relaxed: 0.90
            }
          }
        ]
      }
      
      setTimeout(() => {
        setJourney(mockJourney)
        setLoading(false)
      }, 500)
    }
  }, [params.id])

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!journey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Journey not found</h3>
            <p className="text-gray-400 mb-6">The journey you're looking for doesn't exist</p>
            <Link 
              href="/journeys"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold"
            >
              Back to Journeys
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/journeys')}
              className="p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold">Journey Details</h1>
          </div>
          
          <div className={`px-4 py-2 rounded-full text-sm font-medium ${
            journey.completed 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {journey.completed ? 'Completed' : 'In Progress'}
          </div>
        </div>

        {/* Journey Info */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold capitalize mb-2">{journey.mood} Journey</h2>
              <p className="text-gray-400">Started on {formatDate(journey.startDate)}</p>
              {journey.endDate && (
                <p className="text-gray-400">Ended on {formatDate(journey.endDate)}</p>
              )}
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold">{formatDuration(journey.duration)}</div>
              <div className="text-gray-400">{journey.songs.length} songs</div>
            </div>
          </div>

          {/* Emotion Progression */}
          {journey.emotionProgression.length > 0 && (
            <div className="mb-6">
              <h3 className="font-bold mb-3">Emotional Progression</h3>
              <div className="flex flex-wrap gap-2">
                {journey.emotionProgression.map((emotionPoint: any, index: number) => (
                  <div 
                    key={index} 
                    className="px-3 py-2 bg-black/30 rounded-lg text-sm"
                  >
                    <div className="font-medium">
                      {Object.entries(emotionPoint.emotions)[0]?.[0] || 'Unknown'}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {new Date(emotionPoint.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-lg transition-all">
              Play Journey
            </button>
            <button className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
              Share
            </button>
          </div>
        </div>

        {/* Songs List */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Songs in this Journey</h3>
          
          <div className="space-y-3">
            {journey.songs.map((song: any, index: number) => (
              <div 
                key={song.id} 
                className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-12 text-center text-gray-500">
                  <span className="text-sm">{index + 1}</span>
                </div>
                
                <div className="w-16 h-16 rounded-lg overflow-hidden">
                  <img 
                    src={song.imageUrl} 
                    alt={song.title}
                    className="w-16 h-16"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-gray-400">{song.artist}</div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(song.emotionAnalysis).map(([emotion, score]: [string, any]) => (
                      <span 
                        key={emotion} 
                        className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                      >
                        {emotion}: {Math.round(score * 100)}%
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Insights */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Journey Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-bold">Emotional Flow</div>
              <div className="text-sm text-gray-400">Smooth transitions between emotional states</div>
            </div>
            
            <div className="p-4 bg-violet-500/10 rounded-lg">
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-bold">Musical Diversity</div>
              <div className="text-sm text-gray-400">Variety of artists and genres</div>
            </div>
            
            <div className="p-4 bg-pink-500/10 rounded-lg">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-bold">Engagement</div>
              <div className="text-sm text-gray-400">Full journey completion rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}