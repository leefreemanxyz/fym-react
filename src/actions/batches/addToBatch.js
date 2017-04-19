import { CALL_API, PATCH } from '../../middleware/api'

export default (batchId, userId, action) => {
  console.log('submitting in action')
  console.log()
  return {
      [CALL_API]: {
      service: 'batches',
      method: PATCH,
      authenticate: true,
      params:{ students: userId,
                add: action
                },
      id: batchId,
    }
  }
}
