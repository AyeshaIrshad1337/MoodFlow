'use client'

import { useState, useEffect } from 'react'
import { PlayerService } from '../lib/player-service'
import { useRouter } from 'next/navigation'

export function MiniPlayer() {
  const router = useRouter()
  const [currentSong, setCurrentSong] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if there's an active journey
    const journey = PlayerService.getCurrentJourney()
    const song = PlayerService.getCurrentSong()
    
    if (journey && song) {
      setCurrentSong(song)
      setIsVisible(true)
    }
  }, [])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    // In a real app, you'd control actual playback
  }

  if (!isVisible || !currentSong) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg overflow-hidden">
            <img 
              src={currentSong.imageUrl} 
              alt={currentSong.title}
              className="w-12 h-12"
            />
          </div>
          <div>
            <div className="font-medium text-white">{currentSong.title}</div>
            <div className="text-sm text-gray-400">{currentSong.artist}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePlayPause}
            className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-500 transition-colors"
          >
            <span className="text-white">
              {isPlaying ? '⏸' : '▶'}
            </span>
          </button>
          <button 
            onClick={() => router.push('/player')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors text-sm"
          >
            View Journey
          </button>
        </div>
      </div>
    </div>
  )
}