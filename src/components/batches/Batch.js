import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
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
    let pairs = this.props.users.filter((user)=>{
      if (this.props.batch.students.indexOf(user._id) == -1){
        return false
      } else {
        return true
      }
    })
    if(pairs.length % 2 == 0){
    this.props.submitPairs(generatePairs(pairs), this.props.batch._id)
  }}
  addToBatch(batchId,userId, action){
    this.props.addToBatch(batchId, userId, action)
  }

  render(){
    const {batch, users, currentUser} = this.props


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
          <Link to={`/batches/${batch._id}/pairs`}>
          <RaisedButton
            label="View pairs"
            primary={true}
            /></Link>
        </div>
      <div>
      <div><h3>Users in this batch</h3>
      <p>You must have an even number of students to make pairs. Add 'Not a user' if you're one short.</p>
      {users.map((user, index)=>{
        if(batch.students.indexOf(user._id) == -1){
          return null
        } else {
          return(
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
        }
      })}
      </div>
      <div><h3>All users</h3>
      {users.map((user, index) => {
        if (batch.students.indexOf(user._id) == -1){
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
        } else {
          return null
      }})}
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
