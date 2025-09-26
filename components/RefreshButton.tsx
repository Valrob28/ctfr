'use client'

import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { TwitterService } from '@/utils/twitterService'

interface RefreshButtonProps {
  onRefresh: () => void
}

export function RefreshButton({ onRefresh }: RefreshButtonProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      // Vider le cache Twitter
      TwitterService.clearCache()
      
      // Rafraîchir les données
      onRefresh()
      
      // Attendre un peu pour que les nouvelles données se chargent
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Erreur lors du rafraîchissement:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isRefreshing 
          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
          : 'bg-solana-purple hover:bg-purple-600 text-white hover:scale-105'
        }
      `}
      title="Rafraîchir les photos de profil et derniers tweets"
    >
      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      <span>{isRefreshing ? 'Rafraîchissement...' : 'Rafraîchir'}</span>
    </button>
  )
}
