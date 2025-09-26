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

export interface Tweet {
  id: string
  text: string
  created_at: string
  public_metrics?: {
    retweet_count: number
    like_count: number
    reply_count: number
  }
}

export type VoteCategory = 'bestCall' | 'worstCall' | 'sma'
