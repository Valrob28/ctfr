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
    <div className="flex items-start space-x-3">
      <img
        src={twitterData.avatar}
        alt={`Avatar de ${handle}`}
        className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-solana-purple transition-colors flex-shrink-0"
        onError={(e) => {
          // Fallback si l'image ne charge pas
          const target = e.target as HTMLImageElement
          target.src = `https://ui-avatars.com/api/?name=${handle}&background=6366f1&color=fff&size=128&bold=true`
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-400 mb-1">
          Dernier tweet de @{handle}
        </div>
        <div className="text-xs text-gray-300 leading-relaxed hover:text-white transition-colors cursor-pointer"
             title={twitterData.lastTweet}
             onClick={() => window.open(`https://twitter.com/${handle}`, '_blank')}>
          {twitterData.lastTweet}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Cliquez pour voir le profil
        </div>
      </div>
    </div>
  )
}
