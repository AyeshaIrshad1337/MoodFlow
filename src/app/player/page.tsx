'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PlayerService } from '../lib/player-service'
import { JourneySong } from '../types/journey'
import { Layout } from '../components/Layout'

export default function PlayerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') || 'focused'
  
  const [currentSong, setCurrentSong] = useState<JourneySong | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)
  const [journeyProgress, setJourneyProgress] = useState({ currentSong: 0, totalSongs: 0, percentage: 0 })
  const [emotionInsights, setEmotionInsights] = useState<{ [emotion: string]: number }>({})
  const [isLoading, setIsLoading] = useState(false)

  // Initialize player with first song
  useEffect(() => {
    initializePlayer()
  }, [])

  // Update progress when current song changes
  useEffect(() => {
    if (currentSong) {
      setJourneyProgress(PlayerService.getJourneyProgression())
      setEmotionInsights(PlayerService.getEmotionInsights())
    }
  }, [currentSong])

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSong.duration) {
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentSong])

  const initializePlayer = async () => {
    try {
      // Initialize journey
      await PlayerService.initializeJourney(mood, 'user123')
      
      // Get first song (mock data for demo)
      const firstSong: JourneySong = {
        id: 'first1',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 203,
        imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=The+Weeknd',
        emotionAnalysis: {
          nostalgic: 0.90,
          emotional: 0.85,
          intense: 0.80
        },
        audioFeatures: {
          valence: 0.65,
          energy: 0.85,
          danceability: 0.7
        }
      }
      
      // Add first song to journey
      await PlayerService.addSongToJourney(firstSong)
      
      setCurrentSong(firstSong)
      setCurrentTime(0)
    } catch (error) {
      console.error('Failed to initialize player:', error)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handlePrevious = () => {
    // In a real app, you'd implement proper previous song logic
    alert('Previous song functionality would go here')
  }

  const handleNext = async () => {
    if (!currentSong) return
    
    setIsLoading(true)
    
    try {
      // Get next song based on current song and journey
      const nextSong = await PlayerService.getNextSong(currentSong)
      
      // Add next song to journey
      await PlayerService.addSongToJourney(nextSong)
      
      setCurrentSong(nextSong)
      setCurrentTime(0)
      setIsPlaying(true)
      
      // Update progress
      setJourneyProgress(PlayerService.getJourneyProgression())
      setEmotionInsights(PlayerService.getEmotionInsights())
    } catch (error) {
      console.error('Failed to get next song:', error)
      // Fallback to mock song
      const mockNextSong: JourneySong = {
        id: 'fallback1',
        title: 'Starboy',
        artist: 'The Weeknd',
        album: 'Starboy',
        duration: 230,
        imageUrl: 'https://placehold.co/300x300/c084fc/white?text=Starboy',
        emotionAnalysis: {
          energetic: 0.85,
          confident: 0.80,
          bold: 0.75
        },
        audioFeatures: {
          valence: 0.7,
          energy: 0.8,
          danceability: 0.75
        }
      }
      setCurrentSong(mockNextSong)
      setCurrentTime(0)
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSong) return
    
    const progressBar = e.currentTarget
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left
    const progressBarWidth = progressBar.clientWidth
    const newTime = (clickPosition / progressBarWidth) * currentSong.duration
    setCurrentTime(Math.floor(newTime))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value))
  }

  const handleCompleteJourney = async () => {
    try {
      await PlayerService.completeJourney()
      alert('Journey completed! Check your analytics for insights.')
      router.push('/dashboard')
    } catch (error) {
      console.error('Failed to complete journey:', error)
    }
  }

  if (!currentSong) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    )
  }

  const progress = currentSong.duration > 0 ? (currentTime / currentSong.duration) * 100 : 0

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Journey Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>Song {journeyProgress.currentSong} of {journeyProgress.totalSongs}</span>
            <span>{journeyProgress.percentage}% complete</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${journeyProgress.percentage}%` }}
            ></div>
          </div>
        </div>

        {/* Now Playing */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-12">
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={currentSong.imageUrl} 
                alt={currentSong.album}
                className="w-64 h-64 rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
          
          <div className="flex-grow text-center md:text-left">
            <div className="mb-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Now playing • {mood} journey
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {currentSong.title}
            </h2>
            <p className="text-gray-400 text-xl mb-2">{currentSong.artist}</p>
            <p className="text-gray-500 mb-8">{currentSong.album}</p>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(currentSong.duration)}</span>
              </div>
              <div 
                className="w-full bg-gray-700 rounded-full h-1 cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="bg-gradient-to-r from-purple-500 to-violet-500 h-1 rounded-full transition-all duration-300"
                  style={{width: `${progress}%`}}
                ></div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center md:justify-start gap-8 mb-6">
              <button 
                onClick={handlePrevious}
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                ⏮
              </button>
              <button 
                onClick={togglePlay}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                <span className="text-white text-2xl">
                  {isPlaying ? '⏸' : '▶'}
                </span>
              </button>
              <button 
                onClick={handleNext}
                disabled={isLoading}
                className="text-gray-400 hover:text-white transition-colors text-xl disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                ) : (
                  '⏭'
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center md:justify-start gap-3">
              <span className="text-gray-400">🔈</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-purple-500"
              />
              <span className="text-gray-400 text-sm">{volume}%</span>
            </div>
          </div>
        </div>

        {/* Emotion Insights */}
        {Object.keys(emotionInsights).length > 0 && (
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
            <h3 className="text-xl font-bold mb-4">Emotional Journey Insights</h3>
            <div className="flex flex-wrap gap-3">
              {Object.entries(emotionInsights)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([emotion, score]) => (
                  <div 
                    key={emotion} 
                    className="px-4 py-2 bg-purple-500/20 rounded-full"
                  >
                    <span className="font-medium capitalize">{emotion}</span>
                    <span className="text-purple-300 ml-2">{Math.round(score * 100)}%</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Current Journey Songs */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Current Journey</h3>
          
          <div className="space-y-2">
            {PlayerService.getCurrentJourney()?.songs.map((song, index) => (
              <div 
                key={song.id} 
                className={`flex items-center gap-4 p-3 rounded-lg bg-black/20 backdrop-blur-sm border transition-all ${
                  song.id === currentSong.id 
                    ? 'border-white/20 bg-white/5' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="w-10 text-center text-gray-500">
                  {song.id === currentSong.id && isPlaying ? (
                    <div className="flex justify-center">
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-purple-500 animate-pulse"></div>
                        <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-4 bg-purple-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img 
                    src={song.imageUrl} 
                    alt={song.title}
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex-grow">
                  <div className={`font-medium ${
                    song.id === currentSong.id ? 'text-white' : 'text-gray-300'
                  }`}>
                    {song.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {song.artist}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {formatTime(song.duration)}
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-gray-400">
                Loading journey songs...
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleCompleteJourney}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold hover:scale-105 shadow-lg"
          >
            Complete Journey
          </button>
          <button
            onClick={handleNext}
            disabled={isLoading}
            className="px-8 py-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-all font-semibold disabled:opacity-50"
          >
            {isLoading ? 'Loading Next Song...' : 'Continue Journey'}
          </button>
        </div>
      </div>
    </Layout>
  )
}