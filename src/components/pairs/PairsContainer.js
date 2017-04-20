import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import subscribeToPairs from '../../actions/pairs/subscribe'
import subscribeToUsers from '../../actions/user/subscribe'
import subscribeToBatches from '../../actions/batches/subscribe'
import subscribeToPublishedPairs from '../../actions/publishedPairs/subscribe'
import publishPairs from '../../actions/publishedPairs/submit'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';

import Matches from '../Matches'
import DailyPairs from '../DailyPairs'

class PairsContainer extends PureComponent {
  componentWillMount(){
    this.props.subscribeToUsers()
    this.props.subscribeToPairs()
    this.props.subscribeToBatches()
    this.props.subscribeToPublishedPairs()
  }
  publishPairs(pairs){
    console.log(pairs)
    console.log(this.props.allPairs[0].batch[0])
    console.log('publish!')
    this.props.publishPairs(pairs, this.props.allPairs[0].batch[0])
  }
  render(){
    const {allPairs, publishedPairs} = this.props
    return (
      <div>
        <h2>PAIRS</h2>
        <h3>Published pairs</h3>
          { allPairs.map((pairs) => {

            return <Paper>{pairs.pairs.map((pair, index)=>{
              if(publishedPairs.indexOf(JSON.stringify(pair)) == -1){
                return null
              } else {
                return <Paper key={index} style={{padding:'20px', margin:'10px'}}>
                  <RaisedButton
                    label="Pairings published"
                    primary={true}
                    disabled={true}
                    onClick={()=>{this.publishPairs(pair)}}/>
                {pair.map((couple, index)=>{
                  return <Paper key={index} style={{padding:'10px'}}><span>{couple[0].name}</span>–
                  <span>{couple[1].name}</span></Paper>
                })}</Paper>
              }

            })}</Paper>
          })}
        <h3>Unpublished pairs</h3>
        { allPairs.map((pairs) => {

          return <Paper>{pairs.pairs.map((pair, index)=>{
            if(publishedPairs.indexOf(JSON.stringify(pair)) == -1){
              return <Paper key={index} style={{padding:'20px', margin:'10px'}}>
                <RaisedButton
                  label="Publish this set of pairings"
                  primary={true}
                  onClick={()=>{this.publishPairs(pair)}}/>
              {pair.map((couple, index)=>{
                return <Paper key={index} style={{padding:'10px'}}><span>{couple[0].name}</span>–
                <span>{couple[1].name}</span></Paper>
              })}</Paper>
            } else {
              return null
            }

          })}</Paper>
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ pairs, loading, users, publishedPairs }, { params }) => {
  console.log(publishedPairs)
  return {
    allPairs: pairs.filter((pair)=>{
      if(pair.batch[0] === params.batchId){
        return true
      }
      return false
    }, {}),
    users,
    loading,
    publishedPairs: publishedPairs.map((publishedPair)=>{
      return JSON.stringify(publishedPair.publishedPairs)
    }),
  }
}
export default connect(mapStateToProps, { subscribeToPairs, subscribeToUsers, publishPairs, subscribeToPublishedPairs, subscribeToBatches })(PairsContainer)
