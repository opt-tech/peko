import { getVariables } from '../../ common/util'
import { FamousQuote } from './types'

const axios = require('axios')

const { QUIZ_RAPID_API_KEY } = getVariables(['QUIZ_RAPID_API_KEY'])

export async function fetchQuote(count: number): Promise<FamousQuote[]> {
  const result = await axios({
    method: 'GET',
    url: 'https://andruxnet-random-famous-quotes.p.rapidapi.com/',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'andruxnet-random-famous-quotes.p.rapidapi.com',
      'x-rapidapi-key': QUIZ_RAPID_API_KEY,
    },
    params: {
      cat: 'movies',
      count: count.toString(),
    },
  })
  return result.data
}
