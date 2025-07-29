'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AnalyticsService } from '../lib/analytics-service'
import { UserInsights } from '../types/journey'
import { Layout } from '../components/Layout'

export default function AnalyticsPage() {
  const router = useRouter()
  const [insights, setInsights] = useState<UserInsights | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    loadInsights()
  }, [timeRange])

  const loadInsights = async () => {
    try {
      const userInsights = await AnalyticsService.getUserInsights('user123')
      setInsights(userInsights)
    } catch (error) {
      console.error('Failed to load insights:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
      </div>
    )
  }

  if (!insights) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">No data available</h3>
            <p className="text-gray-400 mb-6">Start using MoodFlow to see your insights</p>
            <Link 
              href="/mood-selector"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 transition-all font-semibold"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Music Insights</h1>
          <p className="text-gray-400">Discover patterns in your emotional music journey</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-8">
          <div className="flex bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 p-1">
            {['7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-purple-600 to-violet-600'
                    : 'hover:bg-white/5'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold">{formatTime(insights.listeningHabits.totalTime)}</div>
            <div className="text-gray-400">Total Listening Time</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🎵</div>
            <div className="text-2xl font-bold">{insights.listeningHabits.songsPlayed}</div>
            <div className="text-gray-400">Songs Played</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold">{insights.listeningHabits.favoriteDayOfWeek}</div>
            <div className="text-gray-400">Favorite Day</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🌅</div>
            <div className="text-2xl font-bold">{insights.listeningHabits.favoriteTimeOfDay}</div>
            <div className="text-gray-400">Peak Time</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Mood Distribution */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-6">Mood Distribution</h3>
            <div className="space-y-4">
              {Object.entries(insights.listeningHabits.moodDistribution)
                .sort((a, b) => b[1] - a[1])
                .map(([mood, percentage]) => (
                  <div key={mood} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="capitalize">{mood}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-6">Weekly Activity</h3>
            <div className="space-y-4">
              {insights.weeklySummary.slice(-4).map((week, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{week.week}</div>
                    <div className="text-sm text-gray-400">{week.totalJourneys} journeys</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{Math.round(week.totalTime / 3600)}h</div>
                    <div className="text-sm text-gray-400">listening</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emotion Trends */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-12">
          <h3 className="text-xl font-bold mb-6">Emotional Trends</h3>
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-4 gap-4 mb-4">
                {insights.emotionTrends.map((trend, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm text-gray-400 mb-2">{formatDate(trend.date)}</div>
                    {Object.entries(trend.emotions).map(([emotion, score]) => (
                      <div key={emotion} className="mb-2">
                        <div className="font-medium text-sm capitalize">{emotion}</div>
                        <div className="text-xs text-gray-400">{Math.round(score * 100)}%</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Artists and Genres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-6">Top Artists</h3>
            <div className="space-y-3">
              {insights.favoriteArtists.map((artist, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <span>{artist}</span>
                  </div>
                  <button className="px-3 py-1 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm">
                    Play
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold mb-6">Top Genres</h3>
            <div className="space-y-3">
              {insights.favoriteGenres.map((genre, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <span>{genre}</span>
                  </div>
                  <span className="text-sm text-gray-400">
                    {100 - (index * 15)}% match
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights Summary */}
        <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-6">Personal Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-purple-500/10 rounded-lg">
              <div className="text-2xl mb-2">📈</div>
              <div className="font-bold">Growing Engagement</div>
              <div className="text-sm text-gray-400">Your listening time has increased by 25% this month</div>
            </div>
            
            <div className="p-4 bg-violet-500/10 rounded-lg">
              <div className="text-2xl mb-2">🌙</div>
              <div className="font-bold">Evening Explorer</div>
              <div className="text-sm text-gray-400">You prefer calm music during evening hours</div>
            </div>
            
            <div className="p-4 bg-pink-500/10 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-bold">Focus Champion</div>
              <div className="text-sm text-gray-400">Your focus journeys are 30% longer than average</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}