import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import { Router, Route, IndexRoute} from 'react-router'
import store, { history } from './store'
import {ROOT_PATH, USER_INDEX_PATH, USER_SIGN_IN_PATH, USER_SIGN_UP_PATH, MATCHES_PATH} from './routes'

import App from './App'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import UsersIndex from './components/users/UsersIndex'
import MatchesContainer from './components/MatchesContainer'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={ROOT_PATH} component={App}>
        <IndexRoute component={SignUp} />
        <Route path={USER_SIGN_UP_PATH} component={SignUp} />
        <Route path={USER_SIGN_IN_PATH} component={SignIn} />
        <Route path={USER_INDEX_PATH} component={UsersIndex} />
        <Route path={MATCHES_PATH} component={MatchesContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
