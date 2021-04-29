import React, { useState } from 'react'

const Header = ({children}) => 
  <h2>{children}</h2>

const Statistic = ({text, value, symbol}) => 
  <>
    {text}
    {value}
    {symbol}
  </>

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good / total * 100

  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td><Statistic text="good" /></td>
            <td><Statistic value={good} /></td>
          </tr>
          <tr>
            <td><Statistic text="neutral" /></td>
            <td><Statistic value={neutral} /></td>
          </tr>
          <tr>
            <td><Statistic text="bad" /></td>
            <td><Statistic value={bad} /></td>
          </tr>
          <tr>
            <td><Statistic text="total" /></td>
            <td><Statistic value={total} /></td>
          </tr>
          <tr>
            <td><Statistic text="average" /></td>
            <td><Statistic value={average} /></td>
          </tr>
          <tr>
            <td><Statistic text="positive" /></td>
            <td><Statistic value={positive} symbol="%" /></td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header>give feedback</Header>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Header>statistics</Header>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
