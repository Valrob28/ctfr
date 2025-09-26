'use client'

import { useState } from 'react'
import { Twitter, CheckCircle, AlertCircle } from 'lucide-react'

interface TwitterAuthProps {
  onAuthSuccess: (twitterHandle: string) => void
  isAuthenticated: boolean
  twitterHandle?: string
}

export function TwitterAuth({ onAuthSuccess, isAuthenticated, twitterHandle }: TwitterAuthProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTwitterAuth = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simuler l'authentification Twitter
      // En production, vous utiliseriez Twitter OAuth 2.0
      const mockTwitterHandle = prompt('Entrez votre handle Twitter (sans @):')
      
      if (!mockTwitterHandle) {
        setError('Handle Twitter requis')
        return
      }

      // Vérifier que le handle existe (simulation)
      const isValidHandle = await verifyTwitterHandle(mockTwitterHandle)
      
      if (isValidHandle) {
        onAuthSuccess(mockTwitterHandle)
        console.log(`Authentification Twitter réussie pour @${mockTwitterHandle}`)
      } else {
        setError('Handle Twitter invalide ou compte privé')
      }
    } catch (err) {
      setError('Erreur lors de la connexion Twitter')
      console.error('Erreur auth Twitter:', err)
    } finally {
      setIsConnecting(false)
    }
  }

  const verifyTwitterHandle = async (handle: string): Promise<boolean> => {
    try {
      // Vérification simple - en production, utiliser l'API Twitter
      const response = await fetch(`https://unavatar.io/twitter/${handle}`)
      return response.ok
    } catch {
      return false
    }
  }

  const handleDisconnect = () => {
    onAuthSuccess('')
  }

  if (isAuthenticated && twitterHandle) {
    return (
      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <div className="flex-1">
            <div className="text-green-400 font-semibold">
              Connecté à Twitter
            </div>
            <div className="text-green-300 text-sm">
              @{twitterHandle}
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 transition-colors"
          >
            Déconnecter
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        <Twitter className="w-5 h-5 text-blue-400" />
        <div className="flex-1">
          <div className="text-blue-400 font-semibold mb-2">
            Connexion Twitter requise pour voter
          </div>
          <div className="text-blue-300 text-sm mb-3">
            Connectez-vous avec votre compte Twitter pour voter et synchroniser vos votes
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-sm mb-3">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
          <button
            onClick={handleTwitterAuth}
            disabled={isConnecting}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white rounded-lg transition-colors flex items-center space-x-2"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Connexion...</span>
              </>
            ) : (
              <>
                <Twitter className="w-4 h-4" />
                <span>Se connecter avec Twitter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
