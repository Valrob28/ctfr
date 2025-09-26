'use client'

import { useState, useEffect } from 'react'
import { Twitter, CheckCircle, Users } from 'lucide-react'

interface VoteSyncProps {
  twitterHandle?: string
  isAuthenticated: boolean
}

export function VoteSync({ twitterHandle, isAuthenticated }: VoteSyncProps) {
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle')
  const [syncMessage, setSyncMessage] = useState('')

  useEffect(() => {
    if (isAuthenticated && twitterHandle) {
      setSyncStatus('synced')
      setSyncMessage(`Votes synchronisés avec @${twitterHandle}`)
    } else {
      setSyncStatus('idle')
      setSyncMessage('Connexion Twitter requise pour synchroniser les votes')
    }
  }, [isAuthenticated, twitterHandle])

  const handleSync = async () => {
    if (!isAuthenticated) return

    setSyncStatus('syncing')
    setSyncMessage('Synchronisation en cours...')

    try {
      // Simuler la synchronisation avec Twitter
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSyncStatus('synced')
      setSyncMessage(`Votes synchronisés avec @${twitterHandle}`)
    } catch (error) {
      setSyncStatus('error')
      setSyncMessage('Erreur lors de la synchronisation')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-500/20 border border-gray-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-gray-400" />
          <div className="text-gray-400 text-sm">
            Connectez-vous avec Twitter pour synchroniser vos votes
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`border rounded-lg p-4 mb-6 ${
      syncStatus === 'synced' 
        ? 'bg-green-500/20 border-green-500/30' 
        : syncStatus === 'error'
        ? 'bg-red-500/20 border-red-500/30'
        : 'bg-blue-500/20 border-blue-500/30'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {syncStatus === 'synced' ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <Twitter className="w-5 h-5 text-blue-400" />
          )}
          <div>
            <div className={`font-semibold ${
              syncStatus === 'synced' ? 'text-green-400' : 'text-blue-400'
            }`}>
              Synchronisation Twitter
            </div>
            <div className="text-sm text-gray-300">
              {syncMessage}
            </div>
          </div>
        </div>
        
        {syncStatus !== 'synced' && (
          <button
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded text-sm transition-colors"
          >
            {syncStatus === 'syncing' ? 'Sync...' : 'Synchroniser'}
          </button>
        )}
      </div>
    </div>
  )
}
