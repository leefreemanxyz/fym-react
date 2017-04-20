import API from '../../lib/api'
import { history } from '../../store'
import {USER_SIGN_IN_PATH} from '../../routes'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'

const api = new API()
const users = api.service('users')

export default (user) => {
  return (dispatch) =>{
    console.log('logging out user...')
    api.signOut()
    dispatch(signedOutUser())
    history.push(USER_SIGN_IN_PATH)

  }
}

const signedOutUser = () => {
  console.log('dispatching logged out user')
  return {
    type: USER_SIGNED_OUT,
  }
}
