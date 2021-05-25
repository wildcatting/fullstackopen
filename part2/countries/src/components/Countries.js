import React from 'react'
import Country from './Country'

const Countries = ({filter, countries}) => {
  const countriesToShow = 
  filter === ''
    ? countries.filter(country => country.name === '')
    : countries.filter((country) => 
      country.name.toLowerCase().includes(filter.toLowerCase()))

  console.log('filter contains', countriesToShow.length, 'countries')

  return (
    <>
      {countriesToShow.length > 10
        ? 'Too many matches, specify another filter'
        : countriesToShow.map(country =>
            <Country key={country.id} country={country} length={countriesToShow.length} />
      )}
    </>
  )
}

export default Countries