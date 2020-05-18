import { getVariables, okResponse, shuffle } from '../../../ common/util'
import { SlackClient } from '../../../client/slack'
import { Response } from '../../../ common/types'
import { Button, SectionBlock, ActionsBlock } from '@slack/web-api'
import { fetchQuote } from '../util'
import { FamousQuote } from '../types'

const { QUIZ_TOKEN, QUIZ_TARGET_CHANNEL } = getVariables(['QUIZ_TOKEN', 'QUIZ_TARGET_CHANNEL'])

const slackClient = new SlackClient(QUIZ_TOKEN)

function createQuestion(correctQuotes: FamousQuote): SectionBlock {
  return {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `???「${correctQuotes.quote}」`,
    },
  }
}

function createButtons(correctQuotes: FamousQuote, incorrectQuotes: FamousQuote[]): ActionsBlock {
  function createButton(author: string, quote: string, correct: Boolean): Button {
    return {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: author,
      },
      value: JSON.stringify({
        type: 'answer',
        question: quote,
        correct: correct,
        value: author,
      }),
    }
  }

  const correctButton = createButton(correctQuotes.author, correctQuotes.quote, true)
  const incorrectButton = incorrectQuotes.map(quote =>
    createButton(quote.author, quote.quote, false),
  )

  return {
    type: 'actions',
    elements: shuffle([correctButton].concat(incorrectButton)),
  }
}

export async function deliver(): Promise<Response> {
  const quotes = await fetchQuote(5)
  console.log(quotes)

  const correctQuote = quotes[0]
  const incorrectQuotes = quotes.slice(1, 4)

  const blocks = [createQuestion(correctQuote), createButtons(correctQuote, incorrectQuotes)]
  await slackClient.postMessage({
    channel: QUIZ_TARGET_CHANNEL,
    text: '',
    username: 'カービィ',
    blocks,
  })

  return okResponse()
}
