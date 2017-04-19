import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'

export const SUBSCRIBED_TO_BATCHES_SERVICE = 'SUBSCRIBED_TO_BATCHES_SERVICE'
export const BATCH_CREATED = 'BATCH_CREATED'
export const BATCH_UPDATED = 'BATCH_UPDATED'
export const BATCH_REMOVED = 'BATCH_REMOVED'

const api = new API()
const batches = api.service('batches')

export default () => {
  return (dispatch) => {
    batches.on('created', (batch) => { dispatch(createdBatches(batch)) })
    batches.on('updated', (batch) => { dispatch(updatedBatches(batch)) })
    batches.on('patched', (batch) => { dispatch(updatedBatches(batch)) })
    batches.on('removed', (batch) => { dispatch(removedBatches(batch)) })

    dispatch({
      [CALL_API]: {
        service: 'batches',
        method: FIND,
        type: SUBSCRIBED_TO_BATCHES_SERVICE,
        authenticate: true,
        params: {
          query: {
            $sort: { createdAt: -1},
            $limit: 25,
          },
        },
      }
    })
  }
}

const createdBatches = (batch) => {
  return {
    type: BATCH_CREATED,
    payload: batch
  }
}

const updatedBatches = (batch) => {
  return {
    type: BATCH_UPDATED,
    payload: batch
  }
}

const removedBatches = (batch) => {
  return {
    type: BATCH_REMOVED,
    payload: batch
  }
}
