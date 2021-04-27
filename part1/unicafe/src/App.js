import React, { useState } from 'react'

const Header = () => 
  <h2>give feedback</h2>

const Results = () => 
  <h2>statistics</h2>

const Display = props => 
  <div>{props.text} {props.value} {props.symbol}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () =>
    setGood(good + 1)

  const neutralClick = () =>
    setNeutral(neutral + 1)

  const badClick = () =>
    setBad(bad + 1)

  const Total = good + neutral + bad
  const Average = (good - bad) / Total
  const Positive = good / Total * 100

  return (
    <>
      <Header />
      <Button handleClick={goodClick} text="good" />
      <Button handleClick={neutralClick} text="neutral" />
      <Button handleClick={badClick} text="bad" />
      <Results />
      <Display value={good} text="good" />
      <Display value={neutral} text="neutral" />
      <Display value={bad} text="bad" />
      <Display value={Total} text="all" />
      <Display value={Average} text="average" />
      <Display value={Positive} text="positive" symbol="%" />
    </>
  )
}

export default App;
