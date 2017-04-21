import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import signOut from '../actions/user/sign-out'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import People from 'material-ui/svg-icons/social/people'
import FlatButton from 'material-ui/FlatButton'
import { history } from '../store'
import {palette} from '../assets/styles/theme'

import {ROOT_PATH, USER_INDEX_PATH, MATCHES_PATH, BATCHES_PATH, MY_PAIRS_PATH} from '../routes'

export class Navigation extends PureComponent {
  constructor(){
    super()
    this.state = {
      open:false
    }
  }
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
  }
  toggleMenu(){
    this.setState({
      open: !this.state.open
    })
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
    const {signedIn, currentUser} = this.props

    return(
      <div>
      <AppBar title="Find Your Match"
        iconElementLeft={<IconButton><People /></IconButton>}
        onLeftIconButtonTouchTap={this.toggleMenu.bind(this)}
        iconElementRight={signedIn ?
          <FlatButton label="SignOut" onClick={this.signOut.bind(this)} /> :
          <div><FlatButton label="Sign In" onClick={this.signIn} style={{"color":palette.alternateTextColor}} />
          <FlatButton label="Sign Up" onClick={this.signUp} style={{"color":palette.alternateTextColor}} /></div>
        }
        />
        <Drawer
             docked={false}
            onRequestChange={this.toggleMenu.bind(this)}
             open={this.state.open}>
            <div style={{paddingTop: 40}}>
              <Link to={MY_PAIRS_PATH}
                onTouchTap={this.toggleMenu.bind(this)}>
                <MenuItem>My Pairs</MenuItem>
              </Link>
              {currentUser.admin && <Link to={USER_INDEX_PATH}
                onTouchTap={this.toggleMenu.bind(this)}>
                <MenuItem>Users</MenuItem>
              </Link>}
              {currentUser.admin && <Link to={BATCHES_PATH}
                onTouchTap={this.toggleMenu.bind(this)}>
                <MenuItem>Batches</MenuItem>
              </Link>}
            </div>
          </Drawer>
        </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => {
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    currentUser,

  }
}

export default connect(mapStateToProps, { signOut })(Navigation)
