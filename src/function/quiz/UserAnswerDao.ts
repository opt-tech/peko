import { DDB } from '../../client/dynamoDB'
import { getVariable } from '../../ common/util'
import { UserAnswer } from './types'

export class UserAnswerDao {
  table = `peko-${getVariable('STAGE')}-user-answer`

  async put(item: UserAnswer): Promise<void> {
    console.log(item)
    const putItem = {
      TableName: this.table,
      Item: {
        ...item,
      },
    }
    await DDB.put(putItem).promise()
    console.log(`${this.table}に保存した`)
  }
}
