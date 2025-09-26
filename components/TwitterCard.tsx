'use client'

import { useState, useEffect } from 'react'
import { TwitterService } from '@/utils/twitterService'

interface TwitterCardProps {
  handle: string
  refreshKey?: number
}

export function TwitterCard({ handle, refreshKey }: TwitterCardProps) {
  const [twitterData, setTwitterData] = useState<{
    avatar: string
    lastTweet: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTwitterData = async () => {
      setLoading(true)
      try {
        const data = await TwitterService.getTwitterData(handle)
        setTwitterData(data)
      } catch (error) {
        console.error('Erreur lors du chargement des données Twitter:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTwitterData()
  }, [handle, refreshKey])

  if (loading) {
    return (
      <div className="w-12 h-12 bg-gray-600 rounded-full animate-pulse" />
    )
  }

  if (!twitterData) {
    return (
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <span className="text-white text-xs font-bold">@{handle}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <img
        src={twitterData.avatar}
        alt={`Avatar de ${handle}`}
        className="w-8 h-8 rounded-full border-2 border-white/20 hover:border-solana-purple transition-colors"
        onError={(e) => {
          // Fallback si l'image ne charge pas
          const target = e.target as HTMLImageElement
          target.src = `https://ui-avatars.com/api/?name=${handle}&background=6366f1&color=fff&size=128&bold=true`
        }}
      />
      <div className="text-xs text-gray-400 max-w-32 truncate hover:text-white transition-colors cursor-pointer"
           title={twitterData.lastTweet}
           onClick={() => window.open(`https://twitter.com/${handle}`, '_blank')}>
        {twitterData.lastTweet}
      </div>
    </div>
  )
}
