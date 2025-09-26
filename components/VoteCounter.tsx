'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, Twitter, Wallet } from 'lucide-react'

interface VoteCounterProps {
  totalVotes: number
  twitterVotes: number
  anonymousVotes: number
  isAuthenticated: boolean
  twitterHandle?: string
}

export function VoteCounter({ 
  totalVotes, 
  twitterVotes, 
  anonymousVotes, 
  isAuthenticated, 
  twitterHandle 
}: VoteCounterProps) {
  const [voteStats, setVoteStats] = useState({
    total: 0,
    twitter: 0,
    anonymous: 0
  })

  useEffect(() => {
    setVoteStats({
      total: totalVotes,
      twitter: twitterVotes,
      anonymous: anonymousVotes
    })
  }, [totalVotes, twitterVotes, anonymousVotes])

  const twitterPercentage = totalVotes > 0 ? Math.round((twitterVotes / totalVotes) * 100) : 0
  const anonymousPercentage = totalVotes > 0 ? Math.round((anonymousVotes / totalVotes) * 100) : 0

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-solana-purple" />
          <h3 className="text-white font-bold text-lg">Statistiques des Votes</h3>
        </div>
        <div className="text-2xl font-bold text-solana-purple">
          {voteStats.total}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Votes Twitter */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Twitter className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-semibold">Votes Twitter</span>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">
            {voteStats.twitter}
          </div>
          <div className="text-sm text-green-300">
            {twitterPercentage}% du total
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${twitterPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Votes Anonymes */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Wallet className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-semibold">Votes Anonymes</span>
          </div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {voteStats.anonymous}
          </div>
          <div className="text-sm text-blue-300">
            {anonymousPercentage}% du total
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${anonymousPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Statut de connexion */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                <Twitter className="w-4 h-4 text-green-400" />
                <span className="text-green-400 text-sm">
                  Connecté: @{twitterHandle}
                </span>
              </>
            ) : (
              <>
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">
                  Vote anonyme
                </span>
              </>
            )}
          </div>
          <div className="text-xs text-gray-500">
            ID de vote unique généré
          </div>
        </div>
      </div>
    </div>
  )
}
