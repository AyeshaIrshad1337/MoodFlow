export interface JourneySong {
  id: string
  title: string
  artist: string
  album: string
  duration: number // in seconds
  imageUrl: string
  emotionAnalysis: {
    [emotion: string]: number
  }
  audioFeatures: {
    valence: number
    energy: number
    danceability: number
  }
}

export interface Journey {
  id: string
  userId: string
  mood: string
  startDate: string // ISO string
  endDate?: string // ISO string
  duration: number // in seconds
  songs: JourneySong[]
  emotionProgression: {
    timestamp: string
    emotions: {
      [emotion: string]: number
    }
  }[]
  completed: boolean
}

export interface JourneyStats {
  totalJourneys: number
  totalTime: number // in seconds
  favoriteMood: string
  mostPlayedSong: string
  emotionDistribution: {
    [emotion: string]: number
  }
}


export interface FavoriteSong {
  id: string
  songId: string
  title: string
  artist: string
  album: string
  imageUrl: string
  addedAt: string // ISO string
}

export interface Playlist {
  id: string
  name: string
  description: string
  songs: FavoriteSong[]
  createdAt: string // ISO string
  updatedAt: string // ISO string
}

export interface UserFavorites {
  favoriteSongs: FavoriteSong[]
  playlists: Playlist[]
}