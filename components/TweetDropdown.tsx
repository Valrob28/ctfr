'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Twitter, Calendar, MessageCircle } from 'lucide-react'
import { Tweet } from '@/types'
import { TweetService } from '@/utils/tweetService'

interface TweetDropdownProps {
  handle: string
  refreshKey?: number
}

export function TweetDropdown({ handle, refreshKey }: TweetDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTweets = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const fetchedTweets = await TweetService.getRecentTweets(handle)
      setTweets(fetchedTweets)
    } catch (err) {
      setError('Erreur lors du chargement des tweets')
      console.error('Erreur fetch tweets:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen && tweets.length === 0) {
      fetchTweets()
    }
  }, [isOpen, refreshKey])

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `Il y a ${diffInMinutes}min`
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60)
      return `Il y a ${hours}h`
    } else {
      const days = Math.floor(diffInMinutes / 1440)
      return `Il y a ${days}j`
    }
  }

  const truncateText = (text: string, maxLength: number = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-colors"
      >
        <Twitter className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 text-sm font-medium">
          Derniers tweets
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-blue-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-blue-400" />
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-white/10">
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-white font-semibold">@{handle}</span>
              <span className="text-gray-400 text-sm">• 5 derniers tweets</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                <span className="ml-2 text-gray-400">Chargement...</span>
              </div>
            ) : error ? (
              <div className="text-red-400 text-center py-4">
                {error}
              </div>
            ) : (
              <div className="space-y-3">
                {tweets.map((tweet, index) => (
                  <div
                    key={tweet.id}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 hover:border-blue-500/30 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs">
                            {formatTime(tweet.created_at)}
                          </span>
                        </div>
                        
                        <div className="text-white text-sm leading-relaxed mb-2">
                          {tweet.text}
                        </div>
                        
                        {tweet.public_metrics && (
                          <div className="flex items-center space-x-4 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{tweet.public_metrics.reply_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>🔄</span>
                              <span>{tweet.public_metrics.retweet_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span>❤️</span>
                              <span>{tweet.public_metrics.like_count}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-white/10">
              <button
                onClick={() => window.open(`https://twitter.com/${handle}`, '_blank')}
                className="w-full text-center text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Voir le profil complet sur Twitter →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
