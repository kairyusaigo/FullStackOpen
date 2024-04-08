import { useState } from 'react'

const Title = props => <h1>{props.value}</h1>

const Data = props => <div>{props.text + ' '+ props.value}</div>

const Button = props => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

// display the statistics
const Statistics = ({good,neutral,bad}) => {
  return (
    <div>
      <Title value="statistics"/>
      <Data value={good} text="good"/>
      <Data value={neutral} text="neutral"/>
      <Data value={bad} text="bad"/>
      <Data value={good+neutral+bad} text="all"/>
      <Data value={(good-bad)/(good+neutral+bad)} text="average"/>
      <Data value={good/(good+neutral+bad)*(100)+'%'} text="positive"/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title value="give feedback" />
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App