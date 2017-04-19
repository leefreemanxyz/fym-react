import {
  SUBSCRIBED_TO_BATCHES_SERVICE,
  BATCH_CREATED,
  BATCH_UPDATED,
  BATCH_REMOVED
} from '../actions/batches/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_BATCHES_SERVICE :
      return [].concat(payload)

    case BATCH_CREATED :
      const newBatch = Object.assign({}, payload)
      return state.concat([newBatch])

    case BATCH_UPDATED :
      return state.map((batch) => {
        if (batch._id === payload._id) {
          return Object.assign({}, payload)
        }
        return batch
      })

    case BATCH_REMOVED :
      return state.filter((batch) => (batch._id !== payload._id))

    default :
      return state
  }
}
