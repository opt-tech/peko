export interface Message {
  token: string
  team_id: string
  api_app_id: string
  event: {
    subtype?: string
    client_msg_id: string
    type: string
    text: string
    user: string
    username: string
    ts: string
    channel_type: string
    channel: string
    event_ts: string
    thread_ts?: string
    bot_id?: string
  }
  type: string
  event_id: string
  event_time: number
  authed_users: string[]
  isBase64Encoded: boolean
  challenge?: string // for verification
}

export interface Poyo {
  statusCode: number
  choice: 'onePoyo' | 'manyPoyos'
  poyoCount: number
  results?: {
    statusCode: number
    poyoCount: number
  }
}
