import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Avatar from 'material-ui/Avatar'
import subscribeToBatches from '../../actions/batches/subscribe'
import addToBatch from '../../actions/batches/addToBatch'
import RaisedButton from 'material-ui/RaisedButton'
import subscribeToPairs from '../../actions/pairs/subscribe'
import subscribeToUsers from '../../actions/user/subscribe'
import Paper from 'material-ui/Paper'
import User from '../users/User'

import generatePairs from '../../actions/pairs/generatePairs.js'
import submitPairs from '../../actions/pairs/submit.js'

class Batch extends PureComponent {
  componentWillMount(){
    this.props.subscribeToUsers()
    this.props.subscribeToPairs()
    this.props.subscribeToBatches()
  }
  generateAndSubmitPairs(){
    console.log(submitPairs(generatePairs(this.props.users)))
    this.props.submitPairs(generatePairs(this.props.users), this.props.batch._id)
  }
  addToBatch(batchId,userId){
    console.log(batchId)
    console.log(userId)
    this.props.addToBatch(batchId, userId, action)
  }

  render(){
    const {batch, users, currentUser} = this.props
    console.log(users)
    console.log(batch)

    return(
      <div className="batch">
      <div>
        <RaisedButton
          label="Generate pairs"
          primary={true}
          onClick={this.generateAndSubmitPairs.bind(this)}
          />
      </div>
      <div>
      <div><h3>Users in this batch</h3></div>
      <div><h3>All users</h3>
      {this.props.users.map((user, index) => {
        return (
          <Paper key={index}>
          <div className="user">
          <p>{user.name}</p>
            {currentUser.admin && <RaisedButton
              onClick={() => {this.props.addToBatch(batch._id, user._id, (batch.students.indexOf(user._id) == -1))}}
              label={(batch.students.indexOf(user._id) == -1)? "Add to batch" : "Remove from batch" } 
              primary={(batch.students.indexOf(user._id) == -1)? true : false } />}
          </div>
          </Paper>

        )
      })}
      </div>
      </div>
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

const mapStateToProps = ({ batches, pairs, users, currentUser }, {params}) => {
  return {
    batch: batches.reduce((prev,next)=>{
      if(next._id === params.batchId){
        return next
      }
      return prev
    }, {}),
    pairs,
    users,
  currentUser }
  }

export default connect(mapStateToProps, {subscribeToBatches, subscribeToUsers, subscribeToPairs, generatePairs, submitPairs, addToBatch})(Batch)
