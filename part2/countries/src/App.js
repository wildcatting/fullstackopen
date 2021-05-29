import React, { useState } from 'react'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [filter, setFilter] = useState('')

  const handleClick = (event) =>
    setFilter(event.target.id)

  return (
    <>
      <div>
        find countries: <input 
          onChange={({target}) => setFilter(target.value)}
        />
      </div>
      <DisplayCountries filter={filter} handleClick={(event) => handleClick(event)} />
    </>
  )
}

export default App;
