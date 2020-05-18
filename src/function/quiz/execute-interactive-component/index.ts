import { APIGatewayProxyEvent } from 'aws-lambda'
import { parse } from 'querystring'

import { InteractiveComponentRequest, Payload } from '../../../ common/slack-types'
import { Response } from '../../../ common/types'
import { okResponse, getActionFromBlockActions, getVariables } from '../../../ common/util'
import { SlackClient } from '../../../client/slack'
import { UserAnswerDao } from '../UserAnswerDao'

const { QUIZ_TOKEN, QUIZ_ADMIN_CHANNEL } = getVariables(['QUIZ_TOKEN', 'QUIZ_ADMIN_CHANNEL'])

const slackClient = new SlackClient(QUIZ_TOKEN)
const userAnswerDao = new UserAnswerDao()

export async function interactiveComponent(event: APIGatewayProxyEvent): Promise<Response> {
  console.log(event)

  const body = (parse(event.body) as unknown) as InteractiveComponentRequest // TODO
  const payload: Payload = JSON.parse(body.payload)
  console.log(payload)

  try {
    if (payload.type === 'block_actions') {
      const action = getActionFromBlockActions(payload)
      if (action.type === 'answer') {
        const result = action.correct ? '正解' : '不正解'

        await slackClient.postEphemeral({
          user: payload.user.id,
          text: `:kirby: 『${result}』`,
          channel: payload.channel.id,
        })
        const userAnswer = {
          user_id: payload.user.id,
          user_name: payload.user.name,
          ts: payload.container.message_ts,
          question: action.question,
          answer: action.value,
          correct: action.correct,
        }
        await userAnswerDao.put(userAnswer)
      }
    }

    return okResponse()
  } catch (error) {
    console.error(error)
    const errorMessage = `回答はエラー終了しました\nエラーメッセージ: ${error}`

    await slackClient.postEphemeral({
      user: payload.user.id,
      text: errorMessage,
      channel: payload.channel.id,
    })
    await slackClient.postMessage({
      text: 'quizエラー' + errorMessage + `\n\`\`\`${event}\`\`\``,
      channel: QUIZ_ADMIN_CHANNEL,
    })
  }
}
