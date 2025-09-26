'use client'

import { useState, useEffect } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey } from '@solana/web3.js'
import { LeaderboardCard } from '@/components/LeaderboardCard'
import { Header } from '@/components/Header'
import { CategoryFilter } from '@/components/CategoryFilter'
import { RefreshButton } from '@/components/RefreshButton'
import { useTwitterRefresh } from '@/hooks/useTwitterRefresh'
import { getInfluencerData } from '@/utils/solana'
import { InfluencerData } from '@/types'
import { FRENCH_CRYPTO_INFLUENCERS } from '@/data/influencers'

export default function Home() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()
  const [influencers, setInfluencers] = useState<InfluencerData[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredInfluencers, setFilteredInfluencers] = useState<InfluencerData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { isRefreshing, refreshKey, refreshTwitterData } = useTwitterRefresh()

  // Utiliser les influenceurs crypto français
  const influencerHandles = FRENCH_CRYPTO_INFLUENCERS

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await Promise.all(
          influencerHandles.map(async (influencer) => {
            const votes = await getInfluencerData(connection, influencer.name)
            return {
              ...influencer,
              ...votes,
            }
          })
        )
        setInfluencers(data)
        setFilteredInfluencers(data)
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setLoading(false)
      }
    }

    if (connection) {
      fetchData()
      // Rafraîchir toutes les 30 secondes
      const interval = setInterval(fetchData, 30000)
      return () => clearInterval(interval)
    }
  }, [connection])

  // Filtrer les influenceurs par catégorie
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === 'all') {
      setFilteredInfluencers(influencers)
    } else {
      const filtered = influencers.filter(influencer => {
        const influencerData = FRENCH_CRYPTO_INFLUENCERS.find(inf => inf.handle === influencer.handle)
        return influencerData?.category === category
      })
      setFilteredInfluencers(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            🚀 Solana Crypto Leaderboard
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Votez pour vos influenceurs crypto préférés
          </p>
          
          {!connected && (
            <div className="flex justify-center mb-8">
              <WalletMultiButton className="!bg-solana-purple hover:!bg-purple-600 !rounded-lg !px-6 !py-3 !text-lg !font-semibold" />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex flex-col items-center space-y-4 mb-8">
            <CategoryFilter onFilterChange={handleCategoryFilter} />
            <RefreshButton onRefresh={refreshTwitterData} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-solana-purple"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredInfluencers.map((influencer, index) => (
              <LeaderboardCard
                key={influencer.name}
                influencer={influencer}
                rank={index + 1}
                isConnected={connected}
                publicKey={publicKey}
                refreshKey={refreshKey}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
