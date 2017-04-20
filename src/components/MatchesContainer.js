import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import subscribeToPairs from '../actions/pairs/subscribe'
import subscribeToBatches from '../actions/batches/subscribe'
import subscribeToUsers from '../actions/user/subscribe'
import Pair from './Pair'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

import Matches from './Matches'
import DailyPairs from './DailyPairs'

class MatchesContainer extends PureComponent {
  componentWillMount(){
    this.props.subscribeToUsers()
    this.props.subscribeToBatches()
    this.props.subscribeToPairs()

  }
  render(){
    const {pairs} = this.props
    console.log(pairs)
    return (
      <div>
        {this.props.loading ? <p>Loading...</p> :
          pairs.map((dailyPairs, index) => {
            console.log(dailyPairs)
            return <DailyPairs key={index} pairs={dailyPairs} day={index} />
          })



        }
      </div>
    )
  }
}

const mapStateToProps = ({ pairs, loading, users }) => ({ pairs, loading, users })
export default connect(mapStateToProps, { subscribeToPairs, subscribeToUsers, subscribeToBatches })(MatchesContainer)
