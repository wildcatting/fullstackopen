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
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0, all: 0
  })
  
  const setGood = () =>
    setClicks({ ...clicks, good: clicks.good + 1, all: clicks.all + 1})
  
  const setNeutral = () =>
    setClicks({ ...clicks, neutral: clicks.neutral + 1, all: clicks.all + 1}) 
  
  const setBad = () =>
    setClicks({ ...clicks, bad: clicks.bad + 1, all: clicks.all - 1})

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
      <Button handleClick={setToGood} text="good" />
      <Button handleClick={setToNeutral} text="neutral" />
      <Button handleClick={setToBad} text="bad" />
      <Results />
      <Display value={clicks.good} text="good" />
      <Display value={clicks.neutral} text="neutral" />
      <Display value={clicks.bad} text="bad" />
      <Display value={clicks.all} text="average" />
    </>
  )
}

export default App;
