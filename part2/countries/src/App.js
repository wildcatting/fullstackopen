import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  
  return (
    <>
      <div>
        find countries: <input 
          onChange={({target}) => setFilter(target.value)}
        />
      </div>
      <Countries countries={countries} filter={filter} />
    </>
  )
}

export default App;
