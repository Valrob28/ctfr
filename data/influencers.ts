export interface Influencer {
  name: string
  handle: string
  category: 'trader' | 'analyst' | 'influencer' | 'youtuber' | 'developer'
  description?: string
}

export const FRENCH_CRYPTO_INFLUENCERS: Influencer[] = [
  // Traders & Analysts
  { name: '0xAigri', handle: '0xAigri', category: 'trader' },
  { name: 'Felchou ETH', handle: 'felchou_eth', category: 'trader' },
  { name: 'Carlita Crypto', handle: 'carlitacrypto_', category: 'analyst' },
  { name: 'Alan Trading', handle: 'AlanTradingYT', category: 'youtuber' },
  { name: 'Boubou SGC', handle: 'BoubouSGC', category: 'influencer' },
  { name: 'Befreesh Crypto', handle: 'befreeshcrypto', category: 'trader' },
  { name: 'Reine Calypso', handle: 'ReineCalypso', category: 'influencer' },
  { name: 'Lamsito ETH', handle: 'Lamsito_eth', category: 'trader' },
  { name: 'Capetel Vrai', handle: 'Capetelvrai', category: 'youtuber' },
  { name: 'Crypto Picsou', handle: 'CryptoPicsou', category: 'analyst' },
  { name: 'Chris Smiilic', handle: 'ChrisSmiilic', category: 'trader' },
  { name: 'Crypt Chamo', handle: 'CryptChamo', category: 'influencer' },
  { name: 'Paul Theway', handle: 'Paul_Theway', category: 'trader' },
  { name: 'Deep Whale', handle: 'DeepWhale_', category: 'analyst' },
  { name: 'Dogeplaymid', handle: 'Dogeplaymid', category: 'influencer' },
  { name: 'Dark Emi', handle: 'Dark_Emi_', category: 'trader' },
  { name: 'Feyronn', handle: 'feyronn', category: 'developer' },
  { name: 'Crypto Futur', handle: 'crypto_futur', category: 'analyst' },
  { name: 'Haqq Trader', handle: 'Haqqtrader', category: 'trader' },
  { name: 'Power Hasheur', handle: 'PowerHasheur', category: 'influencer' },
  { name: 'Hell Crypto', handle: 'HellCrypto69', category: 'trader' },
  { name: 'Joestar Crypto', handle: 'JoestarCrypto', category: 'analyst' },
  { name: 'Better Call Medhi', handle: 'BetterCallMedhi', category: 'youtuber' },
  { name: 'Mowgli Trading', handle: 'Mowgli_Trading', category: 'trader' },
  { name: 'Crypto Poulpe', handle: 'CryptoPoulpe', category: 'influencer' },
  { name: 'Power Pasheur', handle: 'PowerPasheur', category: 'analyst' },
  { name: 'Lerat Pace', handle: 'leratpace', category: 'trader' },
  { name: 'Tagado BTC', handle: 'TagadoBTC', category: 'analyst' },
  { name: 'Thisma Capital', handle: 'thismacapital', category: 'analyst' },
  { name: 'MOOASTOS', handle: 'MOOASTOS', category: 'influencer' },
  { name: 'Krypto Wayne', handle: 'krypto_wayne', category: 'trader' },
  { name: 'Lowky', handle: '_Lowky', category: 'developer' },
  { name: 'Grisouille F', handle: 'GrisouilleF', category: 'influencer' },
  { name: 'Petit Prince ETH', handle: 'PetitPrinceETH', category: 'analyst' },
  { name: 'xDay Kami', handle: 'xDayKami', category: 'trader' },
  { name: 'Frenchie Panzer', handle: 'FrenchiePanzer', category: 'influencer' },
  { name: '0xBigAx74', handle: '0xBigAx74', category: 'trader' },
  { name: 'Kovni Crypto', handle: 'KovniCrypto', category: 'analyst' },
]

export const getInfluencersByCategory = (category: Influencer['category']) => {
  return FRENCH_CRYPTO_INFLUENCERS.filter(inf => inf.category === category)
}

export const getInfluencerByHandle = (handle: string) => {
  return FRENCH_CRYPTO_INFLUENCERS.find(inf => inf.handle === handle)
}
