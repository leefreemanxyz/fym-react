import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import subscribeToPairs from '../../actions/pairs/subscribe'
import subscribeToUsers from '../../actions/user/subscribe'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

import Matches from '../Matches'
import DailyPairs from '../DailyPairs'

class PairsContainer extends PureComponent {
  componentWillMount(){
    this.props.subscribeToUsers()
    this.props.subscribeToPairs()
  }
  render(){
    const {allPairs} = this.props
    return (
      <div>
        <h2>PAIRS</h2>
        { allPairs.map((pairs) => {
          return <Paper>{pairs.pairs.map((pair, index)=>{
            return <Paper style={{padding:'20', margin:'10'}}>
            {pair.map((couple)=>{
              return <Paper style={{padding:'10'}}><span>{couple[0].name}</span>–
              <span>{couple[1].name}</span></Paper>
            })}</Paper>
          })}</Paper>
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ pairs, loading, users }, { params }) => {
  return {
    allPairs: pairs.filter((pair)=>{
      if(pair.batch[0] === params.batchId){
        return true
      }
      return false
    }, {}),
    users,
    loading,
  }
}
export default connect(mapStateToProps, { subscribeToPairs, subscribeToUsers })(PairsContainer)
