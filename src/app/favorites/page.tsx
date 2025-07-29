'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FavoritesService } from '../lib/favorites-service'
import { FavoriteSong, Playlist } from '../types/journey'

export default function FavoritesPage() {
  const router = useRouter()
  const [favorites, setFavorites] = useState<FavoriteSong[]>([])
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'songs' | 'playlists'>('songs')

  useEffect(() => {
    loadFavorites()
  }, [])

  const loadFavorites = async () => {
    try {
      const userFavorites = await FavoritesService.getUserFavorites('user123')
      setFavorites(userFavorites.favoriteSongs)
      setPlaylists(userFavorites.playlists)
    } catch (error) {
      console.error('Failed to load favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleRemoveFavorite = async (favoriteId: string) => {
    try {
      await FavoritesService.removeFavoriteSong('user123', favoriteId)
      setFavorites(prev => prev.filter(fav => fav.id !== favoriteId))
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎵</span>
            </div>
            <h1 className="text-2xl font-bold">MoodFlow</h1>
          </div>
          
          <div className="flex gap-3">
            <Link 
              href="/dashboard"
              className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Favorites</h1>
          <p className="text-gray-400">Your saved songs and custom playlists</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 mb-8">
          <button
            onClick={() => setActiveTab('songs')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'songs'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Favorite Songs ({favorites.length})
          </button>
          <button
            onClick={() => setActiveTab('playlists')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'playlists'
                ? 'text-purple-400 border-b-2 border-purple-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Playlists ({playlists.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'songs' ? (
          <div>
            {favorites.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-bold mb-2">No favorite songs yet</h3>
                <p className="text-gray-400 mb-6">Start saving your favorite tracks</p>
                <Link 
                  href="/mood-selector"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold"
                >
                  Discover Music
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favorites.map((favorite) => (
                  <div 
                    key={favorite.id}
                    className="flex items-center gap-4 p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/20 transition-all"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={favorite.imageUrl} 
                        alt={favorite.title}
                        className="w-16 h-16"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="font-medium">{favorite.title}</div>
                      <div className="text-sm text-gray-400">{favorite.artist}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Added {formatDate(favorite.addedAt)}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => router.push(`/player?song=${favorite.songId}`)}
                        className="p-2 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-white/5 transition-colors"
                      >
                        ▶
                      </button>
                      <button 
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        className="p-2 rounded-lg bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-colors text-red-400"
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {playlists.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🎵</div>
                <h3 className="text-xl font-bold mb-2">No playlists yet</h3>
                <p className="text-gray-400 mb-6">Create your first custom playlist</p>
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold">
                  Create Playlist
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {playlists.map((playlist) => (
                  <div 
                    key={playlist.id}
                    className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    onClick={() => router.push(`/playlist/${playlist.id}`)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                        <span className="text-2xl">🎵</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{playlist.name}</h3>
                        <p className="text-sm text-gray-400">{playlist.songs.length} songs</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4">{playlist.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Created {formatDate(playlist.createdAt)}</span>
                      <span>→</span>
                    </div>
                  </div>
                ))}
                
                {/* Create New Playlist Card */}
                <div 
                  className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-white/20 hover:border-white/40 transition-all cursor-pointer flex items-center justify-center"
                  onClick={() => alert('Create playlist functionality would go here')}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">+</div>
                    <div className="font-medium">Create New Playlist</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}