import React from 'react'
import Country from './Country'

const DisplayCountries = ({filter, countries, handleClick, weather, setCapital}) => {
  const countriesToShow = 
  filter === ''
    ? countries.filter(country => country.name === '')
    : countries.filter((country) => 
      country.name.toLowerCase().includes(filter.toLowerCase()))

  console.log('countriesToShow', countriesToShow)

  return (
    <>
      {countriesToShow.length > 10
        ? 'Too many matches, specify another filter'
        : countriesToShow.map(country =>
            <Country 
              key={country.name} 
              country={country} 
              length={countriesToShow.length} 
              handleClick={handleClick}
              weather={weather}
              setCapital={setCapital}
            />
      )}
    </>
  )
}

export default DisplayCountries