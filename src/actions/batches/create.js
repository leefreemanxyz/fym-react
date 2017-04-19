import { CALL_API, CREATE } from '../../middleware/api'

export default (batch) => {
  console.log(batch)
  return {
    [CALL_API]: {
      service: 'batches',
      method: CREATE,
      authenticate: true,
      params: {startDate: batch.startDate,
                endDate: batch.endDate}
    }
  }
}
