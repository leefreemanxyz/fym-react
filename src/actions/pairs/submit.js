import { CALL_API, CREATE } from '../../middleware/api'

export default (pairs, batchId) => {
  console.log('submitting in action')
  console.log(pairs)
  return {
      [CALL_API]: {
      service: 'pairs',
      method: CREATE,
      authenticate: true,
      params:{ pairs: pairs,
                batch: batchId},
      //id: userId,
    }
  }
}
