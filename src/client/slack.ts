import {
  WebClient,
  ChatPostMessageArguments,
  ChatDeleteArguments,
  WebAPICallResult,
  ChatPostEphemeralArguments,
  ChatUpdateArguments,
  ViewsOpenArguments,
  ViewsPublishArguments,
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

  updateMessage(options: ChatUpdateArguments): Promise<WebAPICallResult> {
    return this.web.chat.update(options)
  }

  deleteMessage(options: ChatDeleteArguments): Promise<WebAPICallResult | void> {
    return this.web.chat.delete(options).catch(e => {
      if (e.message === 'An API error occurred: message_not_found') {
        console.log('message_not_found を通過')
        return
      }
      console.error(e.message)
    })
  }

  viewsOpen(options: ViewsOpenArguments): Promise<WebAPICallResult | void> {
    return this.web.views.open(options)
  }

  viewsPublish(options: ViewsPublishArguments): Promise<WebAPICallResult | void> {
    return this.web.views.publish(options)
  }
}
