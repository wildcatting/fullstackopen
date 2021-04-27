import React, { useState } from 'react'

const Header = () => 
  <h2>give feedback</h2>

const Results = () => 
  <h2>statistics</h2>

const Statistic = (props) => 
  <>
    {props.text} {props.value} {props.symbol}
  </>

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / total
  const positive = props.good / total * 100

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
                  <td><Statistic value={props.good} /></td>
              </tr>
              <tr>
                  <td><Statistic text="neutral" /></td>
                  <td><Statistic value={props.neutral} /></td>
              </tr>
              <tr>
                  <td><Statistic text="bad" /></td>
                  <td><Statistic value={props.bad} /></td>
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

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Results />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
