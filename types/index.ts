export interface InfluencerData {
  name: string
  handle: string
  bestCall: number
  worstCall: number
  sma: number
}

export interface TwitterData {
  avatar: string
  lastTweet: string
}

export type VoteCategory = 'bestCall' | 'worstCall' | 'sma'
