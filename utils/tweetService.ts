import { Tweet } from '@/types'

const TWITTER_BEARER_TOKEN = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN || ''

export class TweetService {
  private static cache: { [handle: string]: { tweets: Tweet[], timestamp: number } } = {}
  private static CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  public static async getRecentTweets(handle: string): Promise<Tweet[]> {
    const cached = this.cache[handle]
    if (cached && (Date.now() - cached.timestamp < this.CACHE_DURATION)) {
      return cached.tweets
    }

    try {
      if (!TWITTER_BEARER_TOKEN) {
        return this.getMockTweets(handle)
      }

      // Récupérer l'ID utilisateur
      const userResponse = await fetch(
        `https://api.twitter.com/2/users/by/username/${handle}`,
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
          },
          signal: AbortSignal.timeout(5000)
        }
      )

      if (!userResponse.ok) {
        console.warn(`Utilisateur @${handle} non trouvé`)
        return this.getMockTweets(handle)
      }

      const userData = await userResponse.json()
      const userId = userData.data?.id

      if (!userId) {
        return this.getMockTweets(handle)
      }

      // Récupérer les tweets récents
      const tweetsResponse = await fetch(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,text`,
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
          },
          signal: AbortSignal.timeout(5000)
        }
      )

      if (!tweetsResponse.ok) {
        console.warn(`Erreur récupération tweets pour @${handle}`)
        return this.getMockTweets(handle)
      }

      const tweetsData = await tweetsResponse.json()
      const tweets: Tweet[] = tweetsData.data?.map((tweet: any) => ({
        id: tweet.id,
        text: tweet.text,
        created_at: tweet.created_at,
        public_metrics: tweet.public_metrics
      })) || []

      this.cache[handle] = { tweets, timestamp: Date.now() }
      return tweets

    } catch (error) {
      console.error(`Erreur lors de la récupération des tweets pour @${handle}:`, error)
      return this.getMockTweets(handle)
    }
  }

  private static getMockTweets(handle: string): Tweet[] {
    const mockTweets: Tweet[] = [
      {
        id: `${handle}_1`,
        text: `Nouvelle analyse technique sur $BTC - Les niveaux de support sont solides. 📈 #Bitcoin #Crypto`,
        created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        public_metrics: { retweet_count: 12, like_count: 45, reply_count: 8 }
      },
      {
        id: `${handle}_2`,
        text: `Le marché crypto montre des signes de reprise. Patience et discipline sont clés. 🚀`,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        public_metrics: { retweet_count: 8, like_count: 32, reply_count: 5 }
      },
      {
        id: `${handle}_3`,
        text: `Thread sur les altcoins à surveiller cette semaine. 1/5 🧵`,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        public_metrics: { retweet_count: 15, like_count: 67, reply_count: 12 }
      },
      {
        id: `${handle}_4`,
        text: `DCA strategy update: Acheté à $42k. Target: $50k. 📊`,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        public_metrics: { retweet_count: 6, like_count: 28, reply_count: 3 }
      },
      {
        id: `${handle}_5`,
        text: `Les institutions continuent d'accumuler. Bull run incoming? 🐂`,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        public_metrics: { retweet_count: 22, like_count: 89, reply_count: 18 }
      }
    ]

    this.cache[handle] = { tweets: mockTweets, timestamp: Date.now() }
    return mockTweets
  }

  public static clearCache() {
    this.cache = {}
    console.log('Cache tweets vidé')
  }
}
