import React, { useState } from 'react'

const Header = () => 
  <h2>give feedback</h2>

const Results = () => 
  <h2>statistics</h2>

const Display = props => 
  <div>{props.text} {props.value}</div>
  

  const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <>
      <Header />
      <Button handleClick={() => setToGood(good + 1)} text="good" />
      <Button handleClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setToBad(bad + 1)} text="bad" />
      <Results />
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
    </>
  )
}

export default App;
