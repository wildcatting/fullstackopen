import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryView from './CountryView'

const Country = ({country, length, handleClick}) => {
  const [weather, setWeather] = useState('')

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('contacting weatherstack')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        console.log('2nd promise fulfilled')
        setWeather(response.data)
    })
  }, [api_key, country.capital])
  console.log('rendering weather for', country.capital, weather)
  
  let show = true

  const clickToShow = show
    ? <div key={country.name}>
        {country.name}
        <button onClick={handleClick} id={country.name}>show</button>
        <br />
      </div>
    : <CountryView country={country} weather={weather} id={country.name} />

  return (
    length === 1
      ? <CountryView country={country} weather={weather} />
      : clickToShow
  )
}

export default Country