'use client'

import { useMemo } from 'react'
import { ConnectionProvider, WalletProvider as SolanaWalletProviderLib } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

// Import des styles du wallet adapter
import '@solana/wallet-adapter-react-ui/styles.css'

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  // Le réseau à utiliser
  const network = WalletAdapterNetwork.Devnet

  // L'endpoint RPC
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // Les wallets supportés
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProviderLib wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProviderLib>
    </ConnectionProvider>
  )
}
