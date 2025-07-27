'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PlayerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood') || 'focused'
  
  // Playlist of songs
  const playlist = [
    {
      id: 1,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 203,
      imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=The+Weeknd'
    },
    {
      id: 2,
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 215,
      imageUrl: 'https://placehold.co/300x300/a855f7/white?text=Save+Tears'
    },
    {
      id: 3,
      title: 'Starboy',
      artist: 'The Weeknd',
      album: 'Starboy',
      duration: 230,
      imageUrl: 'https://placehold.co/300x300/c084fc/white?text=Starboy'
    }
  ]

  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(80)

  const currentSong = playlist[currentSongIndex]
  const progress = currentSong.duration > 0 ? (currentTime / currentSong.duration) * 100 : 0

  // Format time helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isPlaying) {
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
  }, [isPlaying, currentSong.duration, currentSongIndex])

  const handlePrevious = () => {
    setCurrentTime(0)
    setCurrentSongIndex(prev => prev === 0 ? playlist.length - 1 : prev - 1)
  }

  const handleNext = () => {
    setCurrentTime(0)
    setCurrentSongIndex(prev => (prev + 1) % playlist.length)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left
    const progressBarWidth = progressBar.clientWidth
    const newTime = (clickPosition / progressBarWidth) * currentSong.duration
    setCurrentTime(Math.floor(newTime))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Top Navigation */}
      <div className="px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/mood-selector"
              className="p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              ← Back to Moods
            </Link>
            <h1 className="text-xl font-bold capitalize">{mood} Journey</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
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
                Now playing
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
                className="text-gray-400 hover:text-white transition-colors text-xl"
              >
                ⏭
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

        {/* Playlist */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Your {mood} Journey</h3>
          
          <div className="space-y-2">
            {playlist.map((song, index) => (
              <div 
                key={song.id} 
                onClick={() => {
                  setCurrentSongIndex(index)
                  setCurrentTime(0)
                  setIsPlaying(true)
                }}
                className={`flex items-center gap-4 p-3 rounded-lg bg-black/20 backdrop-blur-sm border transition-all cursor-pointer ${
                  index === currentSongIndex 
                    ? 'border-white/20 bg-white/5' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="w-10 text-center text-gray-500">
                  {index === currentSongIndex && isPlaying ? (
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
                    alt={song.album}
                    className="w-12 h-12"
                  />
                </div>
                <div className="flex-grow">
                  <div className={`font-medium ${
                    index === currentSongIndex ? 'text-white' : 'text-gray-300'
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
            ))}
          </div>
        </div>

        {/* Continue Journey Button */}
        <div className="text-center">
          <button
            onClick={() => {
              handleNext()
            }}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold hover:scale-105 shadow-lg"
          >
            Continue Journey
          </button>
        </div>
      </div>
    </div>
  )
}