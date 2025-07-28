'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinDate: 'January 2024',
    totalJourneys: 24,
    favoriteMood: 'Calm',
    totalTime: '12h 34m'
  })

  const [recentJourneys, setRecentJourneys] = useState([
    {
      id: 1,
      mood: 'Calm',
      date: '2 hours ago',
      duration: '45 min',
      songs: 12,
      imageUrl: 'https://placehold.co/60x60/8b5cf6/white?text=🎵'
    },
    {
      id: 2,
      mood: 'Energetic',
      date: 'Yesterday',
      duration: '1h 20min',
      songs: 18,
      imageUrl: 'https://placehold.co/60x60/ec4899/white?text=⚡'
    },
    {
      id: 3,
      mood: 'Reflective',
      date: '3 days ago',
      duration: '32 min',
      songs: 8,
      imageUrl: 'https://placehold.co/60x60/06b6d4/white?text=🤔'
    },
    {
      id: 4,
      mood: 'Happy',
      date: '1 week ago',
      duration: '56 min',
      songs: 15,
      imageUrl: 'https://placehold.co/60x60/f59e0b/white?text=😊'
    }
  ])

  const [stats, setStats] = useState({
    totalJourneys: 24,
    totalSongs: 287,
    favoriteMood: 'Calm',
    totalTime: '12h 34m'
  })

  const handleLogout = () => {
    // In a real app, you'd clear the session
    router.push('/')
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
          
          <div className="flex items-center gap-4">
            <Link 
              href="/mood-selector"
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 rounded-lg transition-all"
            >
              Start New Journey
            </Link>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-400">Ready for another emotional journey?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🎵</div>
            <div className="text-2xl font-bold">{stats.totalJourneys}</div>
            <div className="text-gray-400">Total Journeys</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">🎶</div>
            <div className="text-2xl font-bold">{stats.totalSongs}</div>
            <div className="text-gray-400">Songs Played</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold">{stats.totalTime}</div>
            <div className="text-gray-400">Total Time</div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-3xl mb-2">❤️</div>
            <div className="text-2xl font-bold">{stats.favoriteMood}</div>
            <div className="text-gray-400">Favorite Mood</div>
          </div>
        </div>

        {/* Recent Journeys */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Journeys</h2>
            <Link 
              href="/journeys" 
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              View All →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentJourneys.map((journey) => (
              <div 
                key={journey.id}
                className="bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <img 
                      src={journey.imageUrl} 
                      alt={journey.mood}
                      className="w-16 h-16"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg capitalize">{journey.mood}</h3>
                      <span className="text-sm text-gray-400">{journey.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                      <span>{journey.duration}</span>
                      <span>•</span>
                      <span>{journey.songs} songs</span>
                    </div>
                  </div>
                  
                  <button className="text-gray-400 hover:text-white">
                    ▶
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
            <div className="text-2xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2">View Insights</h3>
            <p className="text-gray-400 text-sm">See your emotional patterns over time</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
            <div className="text-2xl mb-3">⚙️</div>
            <h3 className="font-bold text-lg mb-2">Preferences</h3>
            <p className="text-gray-400 text-sm">Customize your journey experience</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
            <div className="text-2xl mb-3">🎵</div>
            <h3 className="font-bold text-lg mb-2">Favorites</h3>
            <p className="text-gray-400 text-sm">Your favorite songs and journeys</p>
          </div>
        </div>
      </div>
    </div>
  )
}