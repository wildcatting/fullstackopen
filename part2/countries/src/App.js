import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [capital, setCapital] = useState('')
  const [weather, setWeather] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    console.log('effect redux')
    axios
    .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
    .then(response => {
      console.log('promise fulfilled')
      setWeather(response.data)
    })
  }, [api_key, capital])

  console.log('rendering', countries.length, 'countries')
  console.log('weather', weather)

  const handleClick = (event) => {
    console.log('click', event.target.id)
    setFilter(event.target.id)
    console.log('filter =', filter)
  }

  return (
    <>
      <div>
        find countries: <input 
          onChange={({target}) => setFilter(target.value)}
        />
      </div>
      <DisplayCountries 
        countries={countries} 
        filter={filter} 
        handleClick={(event) => handleClick(event)}
        weather={weather}
        setCapital={setCapital}
      />
    </>
  )
}

export default App;
