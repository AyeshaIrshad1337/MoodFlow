import { Journey, JourneySong } from '../types/journey'

// Mock current journey data
let currentJourney: Journey | null = null
let currentSongIndex = 0

export class PlayerService {
  // Initialize a new journey
  static async initializeJourney(mood: string, userId: string): Promise<Journey> {
    currentJourney = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      mood,
      startDate: new Date().toISOString(),
      duration: 0,
      songs: [],
      emotionProgression: [],
      completed: false
    }
    currentSongIndex = 0
    return currentJourney
  }

  // Add song to current journey
  static async addSongToJourney(song: JourneySong): Promise<Journey> {
    if (!currentJourney) {
      throw new Error('No active journey')
    }

    // Add song to journey
    currentJourney.songs.push(song)
    currentJourney.duration += song.duration

    // Add emotion progression point
    currentJourney.emotionProgression.push({
      timestamp: new Date().toISOString(),
      emotions: song.emotionAnalysis
    })

    return currentJourney
  }

  // Get current journey
  static getCurrentJourney(): Journey | null {
    return currentJourney
  }

  // Get current song
  static getCurrentSong(): JourneySong | null {
    if (!currentJourney || currentJourney.songs.length === 0) {
      return null
    }
    return currentJourney.songs[currentSongIndex]
  }

  // Get next song in journey
  static async getNextSong(currentSong: JourneySong): Promise<JourneySong> {
    // In a real implementation, this would use AI to recommend the next song
    // based on current song's emotions and user's journey
    
    // For demo, we'll return a mock next song
    const mockNextSongs: JourneySong[] = [
      {
        id: 'next1',
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
      },
      {
        id: 'next2',
        title: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 203,
        imageUrl: 'https://placehold.co/300x300/8b5cf6/white?text=Lights',
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
      },
      {
        id: 'next3',
        title: 'Save Your Tears',
        artist: 'The Weeknd',
        album: 'After Hours',
        duration: 215,
        imageUrl: 'https://placehold.co/300x300/a855f7/white?text=Tears',
        emotionAnalysis: {
          reflective: 0.88,
          smooth: 0.82,
          seductive: 0.78
        },
        audioFeatures: {
          valence: 0.6,
          energy: 0.75,
          danceability: 0.75
        }
      }
    ]

    // Simple logic to pick next song based on current emotion
    const dominantEmotion = Object.entries(currentSong.emotionAnalysis)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'energetic'
    
    // Filter songs that match the emotion
    const matchingSongs = mockNextSongs.filter(song => 
      Object.keys(song.emotionAnalysis).includes(dominantEmotion)
    )
    
    // Return random matching song or first song if none match
    return matchingSongs.length > 0 
      ? matchingSongs[Math.floor(Math.random() * matchingSongs.length)]
      : mockNextSongs[0]
  }

  // Complete current journey
  static async completeJourney(): Promise<Journey> {
    if (!currentJourney) {
      throw new Error('No active journey')
    }

    currentJourney.completed = true
    currentJourney.endDate = new Date().toISOString()
    
    // In a real app, you'd save this to database
    console.log('Journey completed:', currentJourney)
    
    return currentJourney
  }

  // Get journey progression
  static getJourneyProgression(): {
    currentSong: number
    totalSongs: number
    percentage: number
  } {
    if (!currentJourney) {
      return { currentSong: 0, totalSongs: 0, percentage: 0 }
    }
    
    const total = currentJourney.songs.length
    const current = currentSongIndex + 1
    const percentage = total > 0 ? Math.round((current / total) * 100) : 0
    
    return { currentSong: current, totalSongs: total, percentage }
  }

  // Get emotion insights for current journey
  static getEmotionInsights(): { [emotion: string]: number } {
    if (!currentJourney || currentJourney.emotionProgression.length === 0) {
      return {}
    }

    // Calculate average emotions across the journey
    const emotionTotals: { [emotion: string]: number } = {}
    const emotionCounts: { [emotion: string]: number } = {}

    currentJourney.emotionProgression.forEach(point => {
      Object.entries(point.emotions).forEach(([emotion, score]) => {
        emotionTotals[emotion] = (emotionTotals[emotion] || 0) + score
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
      })
    })

    // Calculate averages
    const averages: { [emotion: string]: number } = {}
    Object.entries(emotionTotals).forEach(([emotion, total]) => {
      averages[emotion] = total / emotionCounts[emotion]
    })

    return averages
  }
}