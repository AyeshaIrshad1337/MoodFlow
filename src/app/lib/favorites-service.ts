import { FavoriteSong, Playlist, UserFavorites } from '../types/journey'

// Mock data for demonstration
const mockFavorites: UserFavorites = {
  favoriteSongs: [
    {
      id: 'fav1',
      songId: 'song1',
      title: 'Weightless',
      artist: 'Marconi Union',
      album: 'Weightless',
      imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=🎵',
      addedAt: '2024-01-15T14:30:00Z'
    },
    {
      id: 'fav2',
      songId: 'song3',
      title: 'Uptown Funk',
      artist: 'Mark Ronson ft. Bruno Mars',
      album: 'Uptown Special',
      imageUrl: 'https://placehold.co/300x300/ec4899/white?text=⚡',
      addedAt: '2024-01-14T18:00:00Z'
    }
  ],
  playlists: [
    {
      id: 'playlist1',
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
  ]
}

export class FavoritesService {
  // Get user favorites
  static async getUserFavorites(userId: string): Promise<UserFavorites> {
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real app, you'd fetch from database
        resolve(mockFavorites)
      }, 300)
    })
  }

  // Add song to favorites
  static async addFavoriteSong(userId: string, song: Omit<FavoriteSong, 'id' | 'addedAt'>): Promise<FavoriteSong> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newFavorite: FavoriteSong = {
          ...song,
          id: Math.random().toString(36).substr(2, 9),
          addedAt: new Date().toISOString()
        }
        mockFavorites.favoriteSongs.push(newFavorite)
        resolve(newFavorite)
      }, 300)
    })
  }

  // Remove song from favorites
  static async removeFavoriteSong(userId: string, favoriteId: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = mockFavorites.favoriteSongs.findIndex(fav => fav.id === favoriteId)
        if (index !== -1) {
          mockFavorites.favoriteSongs.splice(index, 1)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 300)
    })
  }

  // Check if song is favorite
  static async isFavoriteSong(userId: string, songId: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const isFavorite = mockFavorites.favoriteSongs.some(fav => fav.songId === songId)
        resolve(isFavorite)
      }, 100)
    })
  }

  // Create playlist
  static async createPlaylist(userId: string, playlistData: Omit<Playlist, 'id' | 'songs' | 'createdAt' | 'updatedAt'>): Promise<Playlist> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newPlaylist: Playlist = {
          ...playlistData,
          id: Math.random().toString(36).substr(2, 9),
          songs: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        mockFavorites.playlists.push(newPlaylist)
        resolve(newPlaylist)
      }, 300)
    })
  }

  // Add song to playlist
  static async addSongToPlaylist(userId: string, playlistId: string, song: FavoriteSong): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const playlist = mockFavorites.playlists.find(p => p.id === playlistId)
        if (playlist) {
          // Check if song already exists in playlist
          const exists = playlist.songs.some(s => s.songId === song.songId)
          if (!exists) {
            playlist.songs.push(song)
            playlist.updatedAt = new Date().toISOString()
          }
          resolve(true)
        } else {
          resolve(false)
        }
      }, 300)
    })
  }

  // Remove song from playlist
  static async removeSongFromPlaylist(userId: string, playlistId: string, songId: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const playlist = mockFavorites.playlists.find(p => p.id === playlistId)
        if (playlist) {
          const index = playlist.songs.findIndex(s => s.id === songId)
          if (index !== -1) {
            playlist.songs.splice(index, 1)
            playlist.updatedAt = new Date().toISOString()
          }
          resolve(true)
        } else {
          resolve(false)
        }
      }, 300)
    })
  }

  // Get all playlists
  static async getUserPlaylists(userId: string): Promise<Playlist[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockFavorites.playlists)
      }, 300)
    })
  }
}