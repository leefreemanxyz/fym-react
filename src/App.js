import React, { PureComponent } from 'react'
import { Provider} from 'react-redux'
import store from './store'
import {SignUp} from './components/SignUp'
import Navigation from './components/Navigation'
import Loading from './components/Loading'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'
import './App.sass'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class App extends PureComponent {
  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  }
  getChildContext(){
    return { muiTheme }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          <Loading />
          <Navigation />
          {this.props.children}
        </div>
      </MuiThemeProvider>

    )
  }
}

export default App
