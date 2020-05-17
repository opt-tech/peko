import {
  ChatPostEphemeralArguments,
  ChatPostMessageArguments,
  WebAPICallResult,
  WebClient,
} from '@slack/web-api'

export class SlackClient {
  private web: WebClient

  constructor(token = '') {
    this.web = new WebClient(token)
  }

  postMessage(options: ChatPostMessageArguments): Promise<WebAPICallResult> {
    return this.web.chat.postMessage(options)
  }

  postEphemeral(options: ChatPostEphemeralArguments): Promise<WebAPICallResult> {
    return this.web.chat.postEphemeral(options)
  }
}
