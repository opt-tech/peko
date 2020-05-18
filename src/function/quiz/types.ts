export interface FamousQuote {
  quote: string
  author: string
  category
}

export interface UserAnswer {
  user_id: string
  user_name: string
  ts: string
  question: string
  answer: string
  correct: Boolean
}
