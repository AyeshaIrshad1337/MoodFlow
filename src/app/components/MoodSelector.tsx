import { useState } from 'react'

interface Mood {
  id: string
  label: string
  emoji: string
  color: string
  bgColor: string
}

interface MoodSelectorProps {
  onMoodSelect: (mood: string) => void
}

export function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  
  const moods: Mood[] = [
    { id: 'happy', label: 'Happy', emoji: '😊', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10 border-yellow-500/20' },
    { id: 'reflective', label: 'Reflective', emoji: '🤔', color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/20' },
    { id: 'calm', label: 'Calm', emoji: '😌', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/20' },
    { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'text-rose-400', bgColor: 'bg-rose-500/10 border-rose-500/20' },
    { id: 'focused', label: 'Focused', emoji: '🎯', color: 'text-violet-400', bgColor: 'bg-violet-500/10 border-violet-500/20' },
    { id: 'romantic', label: 'Romantic', emoji: '💕', color: 'text-pink-400', bgColor: 'bg-pink-500/10 border-pink-500/20' },
  ]

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId)
    onMoodSelect(moodId)
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {moods.map((mood) => (
        <button
          key={mood.id}
          onClick={() => handleMoodSelect(mood.id)}
          className={`
            bg-black/20 backdrop-blur-sm rounded-lg p-4 text-left
            border transition-all hover:scale-105
            ${selectedMood === mood.id 
              ? `${mood.bgColor} border-white/20 scale-105` 
              : 'border-white/10 hover:border-white/20'
            }
          `}
        >
          <div className={`
            text-3xl mb-3 transition-transform
            ${selectedMood === mood.id ? mood.color : 'text-white'}
          `}>
            {mood.emoji}
          </div>
          <div className="font-medium text-white text-sm">
            {mood.label}
          </div>
        </button>
      ))}
    </div>
  )
}