import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import subscribeToUsers from '../../actions/user/subscribe'
import generatePairs from '../../actions/pairs.js'
import User from './User'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class UsersIndex extends PureComponent {
  componentWillMount(){
    this.props.subscribeToUsers()
  }

  render(){
    console.log(this.props)
    const {users} = this.props

    return (
      <div style={{ padding:24, paddingBottom: 86, width: '100%'}}>
        <div>
          <RaisedButton
            label="Generate pairs"
            primary={true}
            onClick={() => {generatePairs(users)}}
            />
        </div>
        <div ref="users" style={{ maxHeight: '80%', overflowY: 'auto', width: '100%'}}>
          {this.props.users.map((user, index) => {
            return (
              <User key={index} user={user} />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users }) => ({ users })
export default connect(mapStateToProps, { subscribeToUsers, generatePairs })(UsersIndex)
