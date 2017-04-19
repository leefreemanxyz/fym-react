import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import subscribeToUsers from '../actions/user/subscribe'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Pair extends PureComponent {
  render(){
    return (
      <div>
        <p>{this.props.pair[0]}</p>
        <p>{this.props.pair[1]}</p>
      </div>
    )
  }
}
