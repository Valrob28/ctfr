'use client'

import { useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { InfluencerData } from '@/types'
import { ProgressBar } from './ProgressBar'
import { VoteButton } from './VoteButton'
import { TwitterCard } from './TwitterCard'
import { voteInfluencer } from '@/utils/solana'
import { useTwitterAuth } from '@/hooks/useTwitterAuth'

interface LeaderboardCardProps {
  influencer: InfluencerData
  rank: number
  isConnected: boolean
  publicKey: PublicKey | null
  refreshKey?: number
}

export function LeaderboardCard({ 
  influencer, 
  rank, 
  isConnected, 
  publicKey,
  refreshKey
}: LeaderboardCardProps) {
  const { connection } = useConnection()
  const { signTransaction } = useWallet()
  const { isAuthenticated, twitterHandle, requireAuth } = useTwitterAuth()
  const [isVoting, setIsVoting] = useState(false)
  const [voteStatus, setVoteStatus] = useState<{
    bestCall: boolean
    worstCall: boolean
    sma: boolean
  }>({
    bestCall: false,
    worstCall: false,
    sma: false
  })

  const handleVote = async (category: 'bestCall' | 'worstCall' | 'sma') => {
    if (!isConnected || !publicKey || !signTransaction) {
      alert('Veuillez connecter votre wallet pour voter')
      return
    }

    // Vérifier l'authentification Twitter
    if (!requireAuth()) {
      alert('Connexion Twitter requise pour voter. Connectez-vous d\'abord avec votre compte Twitter.')
      return
    }

    setIsVoting(true)
    try {
      await voteInfluencer(
        connection,
        publicKey,
        signTransaction,
        influencer.name,
        category,
        twitterHandle // Passer le handle Twitter pour la synchronisation
      )
      
      setVoteStatus(prev => ({ ...prev, [category]: true }))
      
      // Mettre à jour les votes localement
      const updatedInfluencer = { ...influencer }
      if (category === 'bestCall') updatedInfluencer.bestCall += 1
      if (category === 'worstCall') updatedInfluencer.worstCall += 1
      if (category === 'sma') updatedInfluencer.sma += 1
      
    } catch (error) {
      console.error('Erreur lors du vote:', error)
      alert('Erreur lors du vote. Veuillez réessayer.')
    } finally {
      setIsVoting(false)
    }
  }

  const totalVotes = influencer.bestCall + influencer.worstCall + influencer.sma

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
            #{rank}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{influencer.name}</h3>
            <p className="text-gray-400 text-sm">@{influencer.handle}</p>
          </div>
        </div>
        
        <TwitterCard handle={influencer.handle} refreshKey={refreshKey} />
      </div>

      <div className="space-y-4">
        {/* Meilleure Prédiction */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-green-400 font-medium flex items-center">
              ✅ Meilleure Prédiction
            </span>
            <span className="text-white font-bold">{influencer.bestCall}</span>
          </div>
          <ProgressBar 
            value={influencer.bestCall} 
            max={Math.max(totalVotes, 1)} 
            color="green" 
          />
          <VoteButton
            onClick={() => handleVote('bestCall')}
            disabled={!isConnected || !isAuthenticated || isVoting || voteStatus.bestCall}
            loading={isVoting}
            variant="success"
          >
            {!isAuthenticated ? 'Twitter requis' : voteStatus.bestCall ? 'Voté ✅' : 'Voter'}
          </VoteButton>
        </div>

        {/* Pire Prédiction */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-red-400 font-medium flex items-center">
              ❌ Pire Prédiction
            </span>
            <span className="text-white font-bold">{influencer.worstCall}</span>
          </div>
          <ProgressBar 
            value={influencer.worstCall} 
            max={Math.max(totalVotes, 1)} 
            color="red" 
          />
          <VoteButton
            onClick={() => handleVote('worstCall')}
            disabled={!isConnected || !isAuthenticated || isVoting || voteStatus.worstCall}
            loading={isVoting}
            variant="danger"
          >
            {!isAuthenticated ? 'Twitter requis' : voteStatus.worstCall ? 'Voté ❌' : 'Voter'}
          </VoteButton>
        </div>

        {/* Plus Gros SMA */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-purple-400 font-medium flex items-center">
              🤡 Plus Gros SMA
            </span>
            <span className="text-white font-bold">{influencer.sma}</span>
          </div>
          <ProgressBar 
            value={influencer.sma} 
            max={Math.max(totalVotes, 1)} 
            color="purple" 
          />
          <VoteButton
            onClick={() => handleVote('sma')}
            disabled={!isConnected || !isAuthenticated || isVoting || voteStatus.sma}
            loading={isVoting}
            variant="warning"
          >
            {!isAuthenticated ? 'Twitter requis' : voteStatus.sma ? 'Voté 🤡' : 'Voter'}
          </VoteButton>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-center text-gray-400 text-sm">
          Total: <span className="text-white font-semibold">{totalVotes}</span> votes
        </div>
      </div>
    </div>
  )
}
