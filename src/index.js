import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import { Router, Route, IndexRoute} from 'react-router'
import store, { history } from './store'
import {ROOT_PATH, USER_INDEX_PATH, USER_SIGN_IN_PATH, USER_SIGN_UP_PATH, MATCHES_PATH, BATCHES_PATH, BATCH_PATH, PAIRS_PATH, MY_PAIRS_PATH} from './routes'

import App from './App'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import UsersIndex from './components/users/UsersIndex'
import BatchesIndex from './components/batches/BatchesIndex'
import MatchesContainer from './components/MatchesContainer'
import PairsContainer from './components/pairs/PairsContainer'
import Batch from './components/batches/Batch'
import MyPairs from './components/pairs/MyPairs'


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={ROOT_PATH} component={App}>
        <IndexRoute component={MyPairs} />
        <Route path={USER_SIGN_UP_PATH} component={SignUp} />
        <Route path={USER_SIGN_IN_PATH} component={SignIn} />
        <Route path={USER_INDEX_PATH} component={UsersIndex} />
        <Route path={BATCHES_PATH} component={BatchesIndex} />
        <Route path={BATCH_PATH} component={Batch} />
        <Route path={PAIRS_PATH} component={PairsContainer} />
        <Route path={MATCHES_PATH} component={MatchesContainer} />
        <Route path={MY_PAIRS_PATH} component={MyPairs} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
