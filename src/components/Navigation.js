import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import signOut from '../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import People from 'material-ui/svg-icons/social/people'
import FlatButton from 'material-ui/FlatButton'
import { history } from '../store'
import {palette} from '../assets/styles/theme'



export class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
  }
  signUp(){
    history.push('/sign-up')
  }
  signIn(){
    history.push('/sign-in')
  }
  goHome(){
    history.push('/')
  }
  signOut(event) {
    event.preventDefault()
    this.props.signOut()
  }
  render(){
    const {signedIn} = this.props
    return(
      <AppBar title="Find Your Match"
        iconElementLeft={<IconButton onClick={this.goHome}><People /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="SignOut" onClick={this.signOut.bind(this)} /> :
          <div><FlatButton label="Sign In" onClick={this.signIn} style={{"color":palette.alternateTextColor}} />
          <FlatButton label="Sign Up" onClick={this.signUp} style={{"color":palette.alternateTextColor}} /></div>
        }
        />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { signOut })(Navigation)
