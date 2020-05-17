import { APIGatewayProxyEvent } from 'aws-lambda'

import { SlackClient } from './slack'
import { Message, Poyo } from './types'
import { getVariable, poyoText } from './util'
require('dotenv').config()

const token = getVariable('TOKEN')
const slackClient = new SlackClient(token)

export async function executeSF(event: APIGatewayProxyEvent): Promise<any> {
  const message: Message = event.body && JSON.parse(event.body)
  console.log(message)

  const request = require('request') // eslint-disable-line
  const dataString = `{"input": "{}","stateMachineArn": "${getVariable('SF_ARN')}"}`
  const options = {
    url: getVariable('SF_PATH'),
    body: dataString,
  }
  function callback(error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      console.log(body)
    }
  }

  request.post(options, callback)
  return {
    statusCode: 200,
  }
}

export async function invoke(): Promise<any> {
  const choices = ['onePoyo', 'manyPoyos']
  const choice = choices[Math.floor(Math.random() * choices.length)]
  return { statusCode: 200, choice, poyoCount: 0 }
}

export async function poyo(event: Poyo): Promise<any> {
  console.log(event)
  const poyoCount = event.results ? event.results.poyoCount : event.poyoCount

  await slackClient.postMessage({
    channel: getVariable('CHANNEL_ID_SANDBOX'),
    text: poyoText(poyoCount),
    username: 'kirby',
  })
  return { statusCode: 200, poyoCount: poyoCount + 1 }
}

export async function errorNotification(): Promise<any> {
  await slackClient.postMessage({
    channel: getVariable('CHANNEL_ID_SANDBOX'),
    text: '失敗したよ',
    username: 'errorNotification',
  })
  return { statusCode: 200 }
}
