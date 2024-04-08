import { useState } from 'react'

const Title = props => <h1>{props.value}</h1>

const Data = props => <div>{props.text + ' '+ props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

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
      <Title value="statistics" />
      <Data value={good} text="good"></Data>
      <Data value={neutral} text="neutral"></Data>
      <Data value={bad} text="bad"></Data>
      <Data value={good+neutral+bad} text="all"></Data>
      <Data value={(good-bad)/(good+neutral+bad)} text="average"></Data>
      <Data value={good/(good+neutral+bad)*(100)+'%'} text="positive"></Data>
    </div>
  )
}

export default App