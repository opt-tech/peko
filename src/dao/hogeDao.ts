import { DDB } from '../client/dynamoDB'
import { getVariable } from '../ common/util'

export class HogeDao {
  table = `slack-survey-${getVariable('STAGE')}-answer`

  async put(): Promise<any> {
    const putItem = {
      TableName: this.table,
      Item: {
        hoge: 'hoge',
      },
    }
    try {
      await DDB.put(putItem).promise()
      console.log(`${this.table}に保存した`)
    } catch (e) {
      console.error('HogeDao.put failed')
      console.error(e)
    }
  }
}
