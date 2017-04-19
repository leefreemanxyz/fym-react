export default (users) => {
  let matchedRounds = users.length - 1
  let firstRound = JSON.parse(JSON.stringify(users))
  let rounds = new Array(matchedRounds).fill([])
  const roundsList = recursive(matchedRounds, firstRound, rounds)
  console.log(roundsList)
  return roundsList
}

const recursive = (matchedRounds, currentRound, rounds) => {
    if(matchedRounds >= 0  ){
    let nextRound = JSON.parse(JSON.stringify(currentRound))
    nextRound.splice(1, 0, nextRound.splice(-1, 1)[0])
    rounds[matchedRounds] = []
    while (currentRound.length>0) {
      rounds[matchedRounds] = rounds[matchedRounds].concat([[currentRound.shift(), currentRound.pop()]])
    }
    matchedRounds = matchedRounds - 1
    recursive(matchedRounds, nextRound, rounds)
  }
  return rounds
}
