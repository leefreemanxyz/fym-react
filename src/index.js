import React from 'react'
import ReactDOM from 'react-dom'
import { Provider} from 'react-redux'
import { Router, Route, IndexRoute} from 'react-router'
import store, { history } from './store'

import App from './App'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={SignUp} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
