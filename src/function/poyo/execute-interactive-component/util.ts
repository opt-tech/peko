import { BlockActionsPayload } from '../../../ common/slack-types'
import { BlockActionValue } from '../../../ common/types'

export function getActionFromBlockActions(payload: BlockActionsPayload): BlockActionValue {
  const action = payload.actions.shift()

  let value: BlockActionValue
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
