import { CALL_API, CREATE } from '../../middleware/api'

export default (pairs, batchId) => {
  console.log('publishing pairs')
  console.log(pairs)
  return {
      [CALL_API]: {
      service: 'publishedPairs',
      method: CREATE,
      authenticate: true,
      params:{ publishedPairs: pairs,
                batch: batchId},
      //id: userId,
    }
  }
}
