import React, { PureComponent } from 'react'
import Paper from 'material-ui/Paper';


class DailyPairs extends PureComponent {
  render(){
    const {pairs, day} = this.props
    //console.log(this.props)
    return (
      <div>
      <Paper>
        <h3>Day {day+1}</h3>
        {pairs.map((dailyPair, index)=>{
          console.log(dailyPair)
          return <div><p>Pair {index+1}</p>
          <p>{dailyPair[0].name}</p>
          <p>{dailyPair[1].name}</p>
            </div>
        })}
      </Paper>
      </div>
    )
  }
}

export default DailyPairs
