import React, { useState } from 'react'

const Header = () => 
  <h2>give feedback</h2>

const Results = () => 
  <h2>statistics</h2>

const Display = props => 
  <div>{props.value}</div>

  const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  return (
    <>
      <Header />
      <Button handleClick={() => setToValue(1000)} text="good" />
      <Button handleClick={() => setToValue(0)} text="neutral" />
      <Button handleClick={() => setToValue(value + 1)} text="bad" />
      <Results />
      <Display value={value} />
    </>
  )
}

export default App;
