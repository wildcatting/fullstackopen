import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './Country'

const DisplayCountries = ({filter, handleClick}) => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('contacting restcountries')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('rendering', countries.length, 'countries')

  const countriesToShow = 
  filter === ''
    ? countries.filter(country => country.name === '')
    : countries.filter((country) => 
      country.name.toLowerCase().includes(filter.toLowerCase()))
  console.log('search filter:', countriesToShow)


  return (
    <>
      {countriesToShow.length > 10
        ? 'Too many matches, specify another filter'
        : countriesToShow.map(country =>
          <Country key={country.name} country={country} length={countriesToShow.length} handleClick={handleClick} />
      )}
    </>
  )
}

export default DisplayCountries