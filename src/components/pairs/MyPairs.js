import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import subscribeToPublishedPairs from '../../actions/publishedPairs/subscribe'
import Paper from 'material-ui/Paper'
import './myPairs.sass'

class MyPairs extends PureComponent {
  componentWillMount(){
    this.props.subscribeToPublishedPairs()
  }

  render(){
    const {currentUser, myPairs} = this.props
    return (
      <div>
      <h3>Your matches</h3>
      {myPairs.length> 0 ? myPairs.map((pair, index)=> {
        return <Paper className="match" key={index} style={{padding:'10px'}}><span>{pair[0][0].name}</span>–
        <span>{pair[0][1].name}</span></Paper>
      }) : `Sorry, there are no matches for you yet.`}

      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, publishedPairs }) => {
  return {
    myPairs: publishedPairs.map((publishedPair)=>{
      return publishedPair.publishedPairs.filter((pair)=>{
        if(pair[0]._id == currentUser._id || pair[1]._id == currentUser._id){

          return pair
        } else {
          return null
        }
      })
    }),
  currentUser }
  }

export default connect(mapStateToProps, {subscribeToPublishedPairs})(MyPairs)
