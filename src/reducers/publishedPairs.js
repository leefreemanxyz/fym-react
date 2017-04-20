import {
  SUBSCRIBED_TO_PUBLISHEDPAIRS_SERVICE,
  PUBLISHEDPAIR_CREATED,
  PUBLISHEDPAIR_UPDATED,
  PUBLISHEDPAIR_REMOVED
} from '../actions/publishedPairs/subscribe'

export default (state = [], { type, payload } = {}) => {
  switch (type) {
    case SUBSCRIBED_TO_PUBLISHEDPAIRS_SERVICE :
      return [].concat(payload)

    case PUBLISHEDPAIR_CREATED :
      const newPublishedPair = Object.assign({}, payload)
      return [newPublishedPair].concat(state)

    case PUBLISHEDPAIR_UPDATED :
      return state.map((publishedPair) => {
        if (publishedPair._id === payload._id) {
          return Object.assign({}, payload)
        }
        return publishedPair
      })

    case PUBLISHEDPAIR_REMOVED :
      return state.filter((publishedPair) => (publishedPair._id !== payload._id))

    default :
      return state
  }
}
