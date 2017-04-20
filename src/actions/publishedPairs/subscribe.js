import API from '../../lib/api'
import { history } from '../../store'
import { CALL_API, FIND } from '../../middleware/api'

export const SUBSCRIBED_TO_PUBLISHEDPAIRS_SERVICE = 'SUBSCRIBED_TO_PUBLISHEDPAIRS_SERVICE'
export const PUBLISHEDPAIR_CREATED = 'PUBLISHEDPAIR_CREATED'
export const PUBLISHEDPAIR_UPDATED = 'PUBLISHEDPAIR_UPDATED'
export const PUBLISHEDPAIR_REMOVED = 'PUBLISHEDPAIR_REMOVED'

const api = new API()
const publishedPairs = api.service('publishedPairs')

export default () => {
  return (dispatch) => {
    publishedPairs.on('created', (publishedPair) => { dispatch(createdMessage(publishedPair)) })
    publishedPairs.on('updated', (publishedPair) => { dispatch(updatedMessage(publishedPair)) })
    publishedPairs.on('patched', (publishedPair) => { dispatch(updatedMessage(publishedPair)) })
    publishedPairs.on('removed', (publishedPair) => { dispatch(removedMessage(publishedPair)) })

    dispatch({
      [CALL_API]: {
        service: 'publishedPairs',
        method: FIND,
        type: SUBSCRIBED_TO_PUBLISHEDPAIRS_SERVICE,
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

const createdMessage = (publishedPair) => {
  return {
    type: PUBLISHEDPAIR_CREATED,
    payload: publishedPair
  }
}

const updatedMessage = (publishedPair) => {
  return {
    type: PUBLISHEDPAIR_UPDATED,
    payload: publishedPair
  }
}

const removedMessage = (publishedPair) => {
  return {
    type: PUBLISHEDPAIR_REMOVED,
    payload: publishedPair
  }
}
