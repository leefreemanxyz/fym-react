import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import makeAdmin from '../../actions/user/make-admin'
import subscribeToUsers from '../../actions/user/subscribe'
import RaisedButton from 'material-ui/RaisedButton'

class User extends PureComponent {


  render(){
    const {user, currentUser} = this.props

    return(
      <div className="user">
      <p>{user.name}</p>
        {currentUser.admin && <RaisedButton
          onClick={() => {this.props.makeAdmin(this.props.user._id, !this.props.user.admin)}}
          label={user.admin?"Remove Admin":"Make Admin"}
          primary={user.admin?false:true} />}
      </div>
    )
  }
}
/*const mapStateToProps = ({ users, currentUser }) => {
  return {
    user: users.filter((user) => {
      return (user._id )
    })[0]|| {}
  }
}*/

const mapStateToProps = ({ currentUser }) => ({ currentUser })

export default connect(mapStateToProps, {makeAdmin, subscribeToUsers})(User)
