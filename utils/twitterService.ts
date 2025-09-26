import { TwitterData } from '@/types'

// Service Twitter amélioré avec plusieurs sources
export class TwitterService {
  private static cache = new Map<string, { data: TwitterData; timestamp: number }>()
  private static CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  static async getTwitterData(handle: string): Promise<TwitterData> {
    // Vérifier le cache
    const cached = this.cache.get(handle)
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data
    }

    try {
      // Essayer plusieurs sources pour l'avatar
      const avatar = await this.getAvatar(handle)
      
      // Essayer de récupérer le dernier tweet
      const lastTweet = await this.getLastTweet(handle)

      const data: TwitterData = {
        avatar,
        lastTweet
      }

      // Mettre en cache
      this.cache.set(handle, { data, timestamp: Date.now() })
      
      return data
    } catch (error) {
      console.error(`Erreur pour @${handle}:`, error)
      
      // Fallback avec avatar généré
      return {
        avatar: `https://ui-avatars.com/api/?name=${handle}&background=6366f1&color=fff&size=128&bold=true`,
        lastTweet: `Dernier tweet de @${handle} - Données non disponibles`
      }
    }
  }

  private static async getAvatar(handle: string): Promise<string> {
    // Utiliser directement UI-Avatars qui est fiable
    const avatarUrl = `https://ui-avatars.com/api/?name=${handle}&background=6366f1&color=fff&size=128&bold=true`
    console.log(`Avatar généré pour @${handle}:`, avatarUrl)
    return avatarUrl
  }

  private static async getLastTweet(handle: string): Promise<string> {
    try {
      // Essayer de récupérer depuis un service public (sans authentification)
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://nitter.net/${handle}/rss`, {
        signal: AbortSignal.timeout(5000)
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.items && data.items.length > 0) {
          const lastTweet = data.items[0].title
          return lastTweet.length > 100 ? lastTweet.substring(0, 100) + '...' : lastTweet
        }
      }
    } catch (error) {
      console.log(`Impossible de récupérer le tweet pour @${handle}`)
    }

    // Fallback
    return `Dernier tweet de @${handle} - Cliquez pour voir le profil`
  }

  static clearCache() {
    this.cache.clear()
  }

  static getCacheSize() {
    return this.cache.size
  }
}
