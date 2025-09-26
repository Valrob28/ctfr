'use client'

import { WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'

export function Header() {
  const { connected } = useWallet()

  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-white">
            🏆 Crypto Leaderboard
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {connected ? (
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-sm font-medium">
                Connecté
              </span>
              <WalletDisconnectButton className="!bg-red-600 hover:!bg-red-700 !rounded-lg !px-4 !py-2" />
            </div>
          ) : (
            <WalletMultiButton className="!bg-solana-purple hover:!bg-purple-600 !rounded-lg !px-6 !py-3" />
          )}
        </div>
      </div>
    </header>
  )
}
