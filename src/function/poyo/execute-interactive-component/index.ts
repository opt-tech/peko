import { APIGatewayProxyEvent } from 'aws-lambda'
import { parse } from 'querystring'

import { InteractiveComponentRequest, Payload } from '../../../ common/slack-types'
import { Response } from '../../../ common/types'
import { getVariable, okResponse, getActionFromBlockActions } from '../../../ common/util'
import { SlackClient } from '../../../client/slack'

const slackClient = new SlackClient()

export async function interactiveComponent(event: APIGatewayProxyEvent): Promise<Response> {
  console.log(event)
  try {
    const body = (parse(event.body) as unknown) as InteractiveComponentRequest // TODO
    const payload: Payload = JSON.parse(body.payload)
    console.log(payload)

    if (payload.type === 'block_actions') {
      const action = getActionFromBlockActions(payload)
      // Do tasks.
    }

    if (payload.type === 'view_submission') {
      // Do tasks.
    }

    return okResponse()
  } catch (error) {
    console.error(error)
    const errorMessage = `エラー終了しました\nエラーメッセージ: ${error}`
    const ADMIN_CHANNEL = getVariable('ADMIN_CHANNEL')

    await slackClient.postEphemeral({
      user: 'U5M04AM0E',
      text: errorMessage,
      channel: ADMIN_CHANNEL,
    })
    await slackClient.postMessage({
      text: errorMessage + `\n\`\`\`${event}\`\`\``,
      channel: ADMIN_CHANNEL,
    })
  }
}
