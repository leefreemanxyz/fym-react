import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'

export const SUBSCRIBED_TO_PAIRS_SERVICE = 'SUBSCRIBED_TO_PAIRS_SERVICE'
export const PAIR_CREATED = 'PAIR_CREATED'
export const PAIR_UPDATED = 'PAIR_UPDATED'
export const PAIR_REMOVED = 'PAIR_REMOVED'

const api = new API()
const pairs = api.service('pairs')

export default () => {
  return (dispatch) => {
    pairs.on('created', (pair) => { dispatch(createdPairs(pair)) })
    pairs.on('updated', (pair) => { dispatch(updatedPairs(pair)) })
    pairs.on('patched', (pair) => { dispatch(updatedPairs(pair)) })
    pairs.on('removed', (pair) => { dispatch(removedPairs(pair)) })

    dispatch({
      [CALL_API]: {
        service: 'pairs',
        method: FIND,
        type: SUBSCRIBED_TO_PAIRS_SERVICE,
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

const createdPairs = (pair) => {
  return {
    type: PAIR_CREATED,
    payload: pair
  }
}

const updatedPairs = (pair) => {
  return {
    type: PAIR_UPDATED,
    payload: pair
  }
}

const removedPairs = (pair) => {
  return {
    type: PAIR_REMOVED,
    payload: pair
  }
}
