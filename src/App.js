import React, { PureComponent } from 'react'
import { Provider} from 'react-redux'
import store from './store'
import {SignUp} from './components/SignUp'
import Navigation from './components/Navigation'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'
import './App.sass'


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
          <Navigation />
          {this.props.children}
        </div>
      </MuiThemeProvider>

    )
  }
}

export default App
