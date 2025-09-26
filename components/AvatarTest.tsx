'use client'

import { useState } from 'react'

export function AvatarTest() {
  const [testHandle, setTestHandle] = useState('0xAigri')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const testAvatar = async () => {
    setLoading(true)
    try {
      // Test direct de l'API UI-Avatars
      const url = `https://ui-avatars.com/api/?name=${testHandle}&background=6366f1&color=fff&size=128&bold=true`
      setAvatarUrl(url)
    } catch (error) {
      console.error('Erreur test avatar:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 bg-white/10 rounded-lg">
      <h3 className="text-white font-bold mb-4">Test Avatar</h3>
      
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          value={testHandle}
          onChange={(e) => setTestHandle(e.target.value)}
          placeholder="Handle Twitter"
          className="px-3 py-2 rounded bg-white/20 text-white placeholder-gray-400"
        />
        <button
          onClick={testAvatar}
          disabled={loading}
          className="px-4 py-2 bg-solana-purple text-white rounded hover:bg-purple-600 disabled:opacity-50"
        >
          {loading ? 'Test...' : 'Tester'}
        </button>
      </div>

      {avatarUrl && (
        <div className="space-y-4">
          <div className="text-white text-sm">
            URL: {avatarUrl}
          </div>
          <div className="flex items-center space-x-4">
            <img
              src={avatarUrl}
              alt="Test Avatar"
              className="w-16 h-16 rounded-full border-2 border-white/20"
              onError={(e) => {
                console.error('Erreur chargement image:', e)
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
              }}
              onLoad={() => {
                console.log('Image chargée avec succès')
              }}
            />
            <div className="text-white text-sm">
              Avatar pour @{testHandle}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
