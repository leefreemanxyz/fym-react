import {
  SUBSCRIBED_TO_PAIRS_SERVICE,
  PAIR_CREATED,
  PAIR_UPDATED,
  PAIR_REMOVED
} from '../actions/pairs/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_PAIRS_SERVICE :
    console.log('payload')
    console.log(payload)
      return [].concat(payload[0].pairs)

    case PAIR_CREATED :
      const newPair = Object.assign({}, payload)
      return state.concat([newPair])

    case PAIR_UPDATED :
      return state.map((pair) => {
        if (pair._id === payload._id) {
          return Object.assign({}, payload)
        }
        return pair
      })

    case PAIR_REMOVED :
      return state.filter((pair) => (pair._id !== payload._id))

    default :
      return state
  }
}
