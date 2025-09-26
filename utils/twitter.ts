import { TwitterData } from '@/types'

// Configuration de l'API Twitter (à remplacer par vos vraies clés)
const TWITTER_BEARER_TOKEN = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN || ''

export async function getTwitterData(handle: string): Promise<TwitterData> {
  try {
    // Avatar de fallback
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${handle}&background=6366f1&color=fff&size=128&bold=true`
    
    if (!TWITTER_BEARER_TOKEN) {
      // Essayer de récupérer l'avatar depuis Twitter sans token (méthode alternative)
      try {
        const response = await fetch(`https://unavatar.io/twitter/${handle}`)
        if (response.ok) {
          const avatar = response.url
          return {
            avatar,
            lastTweet: `Dernier tweet de @${handle} - Connectez-vous pour voir le contenu`
          }
        }
      } catch (error) {
        console.log('Fallback vers avatar généré')
      }
      
      return {
        avatar: fallbackAvatar,
        lastTweet: `Dernier tweet de @${handle} - Connectez-vous pour voir le contenu`
      }
    }

    // Récupérer les informations de l'utilisateur avec timeout
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${handle}?user.fields=profile_image_url`,
      {
        headers: {
          'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
        signal: AbortSignal.timeout(5000) // 5 secondes timeout
      }
    )

    if (!userResponse.ok) {
      console.warn(`Erreur API Twitter pour @${handle}:`, userResponse.status)
      return {
        avatar: fallbackAvatar,
        lastTweet: `Dernier tweet de @${handle} - Erreur API`
      }
    }

    const userData = await userResponse.json()
    const userId = userData.data?.id

    if (!userId) {
      console.warn(`Utilisateur @${handle} non trouvé`)
      return {
        avatar: fallbackAvatar,
        lastTweet: `@${handle} - Utilisateur non trouvé`
      }
    }

    // Récupérer le dernier tweet avec timeout
    let lastTweet = `Dernier tweet de @${handle}`
    try {
      const tweetsResponse = await fetch(
        `https://api.twitter.com/2/users/${userId}/tweets?max_results=1&tweet.fields=created_at,text`,
        {
          headers: {
            'Authorization': `Bearer ${TWITTER_BEARER_TOKEN}`,
          },
          signal: AbortSignal.timeout(5000)
        }
      )

      if (tweetsResponse.ok) {
        const tweetsData = await tweetsResponse.json()
        if (tweetsData.data && tweetsData.data.length > 0) {
          const tweetText = tweetsData.data[0].text
          lastTweet = tweetText.length > 100 ? tweetText.substring(0, 100) + '...' : tweetText
        }
      }
    } catch (error) {
      console.warn(`Erreur lors de la récupération des tweets pour @${handle}:`, error)
    }

    return {
      avatar: userData.data.profile_image_url || fallbackAvatar,
      lastTweet
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données Twitter:', error)
    
    // Retourner des données de fallback
    return {
      avatar: `https://ui-avatars.com/api/?name=${handle}&background=linear-gradient(45deg, #6366f1, #ec4899)&color=fff&size=128&bold=true`,
      lastTweet: 'Données non disponibles'
    }
  }
}
