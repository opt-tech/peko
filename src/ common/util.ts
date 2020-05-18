import { RequestBody, BlockActionsPayload } from './slack-types'

export function camelCase(str: string): string {
  return str.replace(/[-_](.)/g, (m, g) => g.toUpperCase()).replace(/^./, v => v.toLowerCase())
}

export function snakeCase(str: string): string {
  return str.replace(/^./, v => v.toLowerCase()).replace(/[A-Z]/g, g => `_${g.toLowerCase()}`)
}

export function pascalCase(str: string): string {
  return str.replace(/[-_](.)/g, (m, g) => g.toUpperCase()).replace(/^./, v => v.toUpperCase())
}

export function getVariable(key: string): string {
  const variable = process.env[key]
  if (!variable) throw new Error(`環境変数'${key}'が取得できませんでした`)
  return variable
}
export function getVariables(keys: string[]): Record<string, string> {
  return keys.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: getVariable(cur),
    }),
    {},
  )
}

export const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function verifySubscription(challenge: string | undefined): boolean {
  let ret = false
  if (challenge) {
    console.log('Slack App Subscription Verification')
    ret = true
  }
  return ret
}

export function okResponse(body?: string) {
  const responseBody = body ? JSON.stringify(body) : ''
  return { statusCode: 200, body: responseBody }
}

export function getActionFromBlockActions(payload: BlockActionsPayload): Record<string, any> {
  const action = payload.actions.shift()

  let value: Record<string, any>
  switch (action.type) {
    case 'button':
      value = JSON.parse(action.value)
      break
    case 'overflow':
      value = JSON.parse(action.selected_option.value)
      break
  }
  console.log(value)
  if (!value) throw new Error('action.typeが不正です')
  return value
}
