'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function PlaylistDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [playlist, setPlaylist] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      // Mock data for demonstration
      const mockPlaylist = {
        id: params.id,
        name: 'Relaxing Vibes',
        description: 'Songs for calm and relaxation',
        songs: [
          {
            id: 'fav1',
            songId: 'song1',
            title: 'Weightless',
            artist: 'Marconi Union',
            album: 'Weightless',
            imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=🎵',
            addedAt: '2024-01-15T14:30:00Z'
          }
        ],
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-15T14:30:00Z'
      }
      
      setTimeout(() => {
        setPlaylist(mockPlaylist)
        setLoading(false)
      }, 500)
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!playlist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Playlist not found</h3>
            <p className="text-gray-400 mb-6">The playlist you're looking for doesn't exist</p>
            <Link 
              href="/favorites"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold"
            >
              Back to Favorites
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
              onClick={() => router.push('/favorites')}
              className="p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-2xl font-bold">Playlist</h1>
          </div>
          
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-lg transition-all">
              Play
            </button>
            <button className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
              Share
            </button>
          </div>
        </div>

        {/* Playlist Info */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <span className="text-6xl">🎵</span>
            </div>
            
            <div className="flex-grow">
              <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
              <p className="text-gray-400 mb-4">{playlist.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                <span>{playlist.songs.length} songs</span>
                <span>•</span>
                <span>Created {formatDate(playlist.createdAt)}</span>
                <span>•</span>
                <span>Updated {formatDate(playlist.updatedAt)}</span>
              </div>
              
              <div className="flex gap-3">
                <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold">
                  Play
                </button>
                <button className="px-6 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors">
                  Shuffle Play
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Songs List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Songs</h2>
          
          <div className="space-y-2">
            {playlist.songs.map((song: any, index: number) => (
              <div 
                key={song.id} 
                className="flex items-center gap-4 p-3 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="w-10 text-center text-gray-500">
                  <span className="text-sm">{index + 1}</span>
                </div>
                
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img 
                    src={song.imageUrl} 
                    alt={song.title}
                    className="w-12 h-12"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-gray-400">{song.artist}</div>
                </div>
                
                <div className="text-sm text-gray-400">
                  {formatDate(song.addedAt)}
                </div>
                
                <button className="p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-colors">
                  ⋯
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}