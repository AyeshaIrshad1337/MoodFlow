import { Journey, JourneySong, JourneyStats } from '../types/journey'

// Mock data for demonstration
const mockJourneys: Journey[] = [
  {
    id: '1',
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
  },
  {
    id: '2',
    userId: 'user123',
    mood: 'energetic',
    startDate: '2024-01-14T18:00:00Z',
    endDate: '2024-01-14T19:20:00Z',
    duration: 4800,
    completed: true,
    songs: [
      {
        id: 'song3',
        title: 'Uptown Funk',
        artist: 'Mark Ronson ft. Bruno Mars',
        album: 'Uptown Special',
        duration: 270,
        imageUrl: 'https://placehold.co/300x300/ec4899/white?text=⚡',
        emotionAnalysis: {
          happy: 0.95,
          energetic: 0.92,
          fun: 0.90
        },
        audioFeatures: {
          valence: 0.9,
          energy: 0.85,
          danceability: 0.88
        }
      }
    ],
    emotionProgression: [
      {
        timestamp: '2024-01-14T18:00:00Z',
        emotions: {
          energetic: 0.95,
          excited: 0.90
        }
      }
    ]
  }
]

export class JourneyService {
  // Get all journeys for a user
  static async getUserJourneys(userId: string): Promise<Journey[]> {
    // In a real app, this would fetch from a database
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockJourneys.filter(journey => journey.userId === userId))
      }, 500)
    })
  }

  // Get a specific journey
  static async getJourney(journeyId: string): Promise<Journey | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const journey = mockJourneys.find(j => j.id === journeyId) || null
        resolve(journey)
      }, 300)
    })
  }

  // Create a new journey
  static async createJourney(journeyData: Omit<Journey, 'id' | 'startDate' | 'completed'>): Promise<Journey> {
    return new Promise(resolve => {
      setTimeout(() => {
        const newJourney: Journey = {
          ...journeyData,
          id: Math.random().toString(36).substr(2, 9),
          startDate: new Date().toISOString(),
          completed: false
        }
        mockJourneys.push(newJourney)
        resolve(newJourney)
      }, 500)
    })
  }

  // Add song to journey
  static async addSongToJourney(journeyId: string, song: JourneySong): Promise<Journey> {
    return new Promise(resolve => {
      setTimeout(() => {
        const journey = mockJourneys.find(j => j.id === journeyId)
        if (journey) {
          journey.songs.push(song)
          journey.duration += song.duration
        }
        resolve(journey!)
      }, 300)
    })
  }

  // Complete journey
  static async completeJourney(journeyId: string): Promise<Journey> {
    return new Promise(resolve => {
      setTimeout(() => {
        const journey = mockJourneys.find(j => j.id === journeyId)
        if (journey) {
          journey.completed = true
          journey.endDate = new Date().toISOString()
        }
        resolve(journey!)
      }, 300)
    })
  }

  // Get journey statistics
  static async getUserJourneyStats(userId: string): Promise<JourneyStats> {
    return new Promise(resolve => {
      setTimeout(() => {
        const userJourneys = mockJourneys.filter(j => j.userId === userId)
        
        const stats: JourneyStats = {
          totalJourneys: userJourneys.length,
          totalTime: userJourneys.reduce((sum, journey) => sum + journey.duration, 0),
          favoriteMood: this.getFavoriteMood(userJourneys),
          mostPlayedSong: this.getMostPlayedSong(userJourneys),
          emotionDistribution: this.getEmotionDistribution(userJourneys)
        }
        
        resolve(stats)
      }, 500)
    })
  }

  // Helper methods
  private static getFavoriteMood(journeys: Journey[]): string {
    const moodCount: Record<string, number> = {}
    journeys.forEach(journey => {
      moodCount[journey.mood] = (moodCount[journey.mood] || 0) + 1
    })
    
    return Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown'
  }

  private static getMostPlayedSong(journeys: Journey[]): string {
    const songCount: Record<string, number> = {}
    journeys.forEach(journey => {
      journey.songs.forEach(song => {
        songCount[song.title] = (songCount[song.title] || 0) + 1
      })
    })
    
    return Object.entries(songCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Unknown'
  }

  private static getEmotionDistribution(journeys: Journey[]): { [emotion: string]: number } {
    const emotionCount: Record<string, number> = {}
    
    journeys.forEach(journey => {
      journey.songs.forEach(song => {
        Object.entries(song.emotionAnalysis).forEach(([emotion, score]) => {
          emotionCount[emotion] = (emotionCount[emotion] || 0) + score
        })
      })
    })
    
    // Normalize the counts
    const total = Object.values(emotionCount).reduce((sum, count) => sum + count, 0)
    const normalized: Record<string, number> = {}
    
    Object.entries(emotionCount).forEach(([emotion, count]) => {
      normalized[emotion] = Math.round((count / total) * 100)
    })
    
    return normalized
  }
}