import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import subscribeToUsers from '../../actions/user/subscribe'
import subscribeToBatches from '../../actions/batches/subscribe'
import subscribeToPairs from '../../actions/pairs/subscribe'
import createBatch from '../../actions/batches/create'
import generatePairs from '../../actions/pairs/generatePairs.js'
import submitPairs from '../../actions/pairs/submit.js'
import Batch from './Batch'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Paper from 'material-ui/Paper'
import {BATCH_PATH} from '../../routes'

class BatchesIndex extends PureComponent {
  constructor(){
    super()
    this.state = {
      startDate: null,
      endDate: null
    }
  }
  componentWillMount(){
    this.props.subscribeToUsers()
    this.props.subscribeToBatches()
    //this.props.subscribeToPairs()
  }
  generateAndSubmitPairs(){
    console.log(submitPairs(generatePairs(this.props.users)))
    this.props.submitPairs(generatePairs(this.props.users))
  }
  createBatch(){
    const batch = {
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    console.log(`${this.state.startDate}`)
    console.log(batch)
    this.props.createBatch(batch)
  }
  handleStartChange = (event, date) => {
    this.setState({
      startDate: date,
    });
  };
  handleEndChange = (event, date) => {
    this.setState({
      endDate: date,
    });
  };
  render(){
    console.log(this.props)
    const {batches} = this.props

    return (
      <div style={{ padding:24, paddingBottom: 86, width: '100%'}}>
        <div>
          <DatePicker hintText="Start Date" onChange={this.handleStartChange} />
          <DatePicker hintText="End Date" onChange={this.handleEndChange} />
          <RaisedButton
            label="Create Batch"
            primary={true}
            onClick={this.createBatch.bind(this)}
            />
        </div>
        <div ref="batches" style={{ maxHeight: '80%', overflowY: 'auto', width: '100%'}}>
          {this.props.batches && this.props.batches.map((batch, index) => {
            return (
              <Paper
                  key={index}
                  zDepth={1}
                  style={{ padding:'12px 24px'}}>
                  <Link to={`/batches/${batch._id}`}>
                  <p>{batch.startDate}</p>
                  <p>{batch.endDate}</p></Link>
              </Paper>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ users, batches }) => ({ users, batches })
export default connect(mapStateToProps, { subscribeToUsers, subscribeToPairs, subscribeToBatches, createBatch })(BatchesIndex)
