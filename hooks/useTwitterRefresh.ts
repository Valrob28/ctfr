import { useState, useCallback } from 'react'
import { TwitterService } from '@/utils/twitterService'

export function useTwitterRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const refreshTwitterData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      // Vider le cache Twitter
      TwitterService.clearCache()
      
      // Forcer le rechargement des composants Twitter
      setRefreshKey(prev => prev + 1)
      
      // Attendre un peu pour que les nouvelles données se chargent
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Erreur lors du rafraîchissement Twitter:', error)
    } finally {
      setIsRefreshing(false)
    }
  }, [])

  return {
    isRefreshing,
    refreshKey,
    refreshTwitterData
  }
}
