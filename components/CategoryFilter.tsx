'use client'

import { useState } from 'react'
import { Influencer } from '@/data/influencers'

interface CategoryFilterProps {
  onFilterChange: (category: string) => void
}

export function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const categories = [
    { key: 'all', label: 'Tous les influenceurs', emoji: '🏆', count: 40 },
    { key: 'trader', label: 'Traders', emoji: '📈', count: 15 },
    { key: 'analyst', label: 'Analystes', emoji: '🔍', count: 10 },
    { key: 'influencer', label: 'Influenceurs', emoji: '🌟', count: 8 },
    { key: 'youtuber', label: 'YouTubeurs', emoji: '📺', count: 4 },
    { key: 'developer', label: 'Développeurs', emoji: '💻', count: 3 },
  ]

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    onFilterChange(category)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category.key}
          onClick={() => handleCategoryChange(category.key)}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all duration-200
            ${activeCategory === category.key
              ? 'bg-solana-purple text-white shadow-lg scale-105'
              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
            }
          `}
        >
          <span className="mr-2">{category.emoji}</span>
          {category.label}
          <span className="ml-2 text-xs opacity-75">({category.count})</span>
        </button>
      ))}
    </div>
  )
}
