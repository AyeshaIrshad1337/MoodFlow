import { UserInsights, EmotionTrend, ListeningHabits } from '../types/journey'

// Mock data for demonstration
const mockInsights: UserInsights = {
  emotionTrends: [
    {
      date: '2024-01-01',
      emotions: {
        calm: 0.85,
        happy: 0.65,
        focused: 0.75
      }
    },
    {
      date: '2024-01-08',
      emotions: {
        calm: 0.90,
        happy: 0.70,
        focused: 0.65
      }
    },
    {
      date: '2024-01-15',
      emotions: {
        calm: 0.88,
        happy: 0.75,
        focused: 0.80
      }
    },
    {
      date: '2024-01-22',
      emotions: {
        calm: 0.92,
        happy: 0.80,
        focused: 0.78
      }
    }
  ],
  listeningHabits: {
    totalTime: 15420, // ~4.3 hours
    songsPlayed: 287,
    favoriteTimeOfDay: 'Evening',
    favoriteDayOfWeek: 'Saturday',
    moodDistribution: {
      calm: 45,
      energetic: 25,
      happy: 20,
      focused: 10
    }
  },
  favoriteArtists: [
    'The Weeknd',
    'Marconi Union',
    'Coldplay',
    'Radiohead',
    'Bon Iver'
  ],
  favoriteGenres: [
    'Ambient',
    'Pop',
    'Alternative',
    'Electronic',
    'Indie'
  ],
  moodCorrelations: [
    {
      mood: 'calm',
      correlatedEmotions: ['peaceful', 'relaxed', 'serene']
    },
    {
      mood: 'energetic',
      correlatedEmotions: ['excited', 'happy', 'motivated']
    },
    {
      mood: 'focused',
      correlatedEmotions: ['concentrated', 'productive', 'determined']
    }
  ],
  weeklySummary: [
    {
      week: 'Dec 25 - Dec 31, 2023',
      totalJourneys: 8,
      totalTime: 7200 // 2 hours
    },
    {
      week: 'Jan 1 - Jan 7, 2024',
      totalJourneys: 12,
      totalTime: 10800 // 3 hours
    },
    {
      week: 'Jan 8 - Jan 14, 2024',
      totalJourneys: 15,
      totalTime: 14400 // 4 hours
    },
    {
      week: 'Jan 15 - Jan 21, 2024',
      totalJourneys: 18,
      totalTime: 18000 // 5 hours
    }
  ]
}

export class AnalyticsService {
  // Get user insights
  static async getUserInsights(userId: string): Promise<UserInsights> {
    return new Promise(resolve => {
      setTimeout(() => {
        // In a real app, you'd fetch from database and calculate analytics
        resolve(mockInsights)
      }, 500)
    })
  }

  // Get emotion trends for chart
  static async getEmotionTrends(userId: string, days: number = 30): Promise<EmotionTrend[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        // Filter by date range
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - days)
        
        const filteredTrends = mockInsights.emotionTrends.filter(trend => 
          new Date(trend.date) >= cutoffDate
        )
        
        resolve(filteredTrends)
      }, 300)
    })
  }

  // Get listening habits
  static async getListeningHabits(userId: string): Promise<ListeningHabits> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockInsights.listeningHabits)
      }, 300)
    })
  }

  // Get mood distribution data for pie chart
  static getMoodDistributionData(habits: ListeningHabits) {
    return Object.entries(habits.moodDistribution).map(([mood, percentage]) => ({
      name: mood.charAt(0).toUpperCase() + mood.slice(1),
      value: percentage
    }))
  }

  // Get weekly summary data for bar chart
  static getWeeklySummaryData(weeklySummary: any[]) {
    return weeklySummary.map(week => ({
      name: week.week,
      journeys: week.totalJourneys,
      time: Math.round(week.totalTime / 3600) // Convert to hours
    }))
  }
}