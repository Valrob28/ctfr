'use client'

import { useState, useCallback } from 'react'

export function useTwitterAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [twitterHandle, setTwitterHandle] = useState<string>('')
  const [authError, setAuthError] = useState<string | null>(null)

  const authenticate = useCallback((handle: string) => {
    if (handle && handle.trim()) {
      setTwitterHandle(handle.trim())
      setIsAuthenticated(true)
      setAuthError(null)
      console.log(`Twitter authentifié: @${handle}`)
    } else {
      setTwitterHandle('')
      setIsAuthenticated(false)
      setAuthError('Handle Twitter invalide')
    }
  }, [])

  const disconnect = useCallback(() => {
    setTwitterHandle('')
    setIsAuthenticated(false)
    setAuthError(null)
    console.log('Twitter déconnecté')
  }, [])

  const requireAuth = useCallback(() => {
    if (!isAuthenticated) {
      setAuthError('Connexion Twitter requise pour voter')
      return false
    }
    return true
  }, [isAuthenticated])

  return {
    isAuthenticated,
    twitterHandle,
    authError,
    authenticate,
    disconnect,
    requireAuth
  }
}
