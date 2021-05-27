import React from 'react'
import CountryView from './CountryView'

const Country = ({country, length, handleClick, weather, setCapital}) => {
  let show = true

  const clickToShow = show
  ? <div key={country.name}>
      {country.name}
      <button onClick={handleClick} id={country.name}>
        show
      </button>
      <br />
    </div>
  : <CountryView 
      country={country}
      weather={weather}
      setCapital={setCapital}
      id={country.name} 
    />

  return (
    length === 1
      ? <CountryView 
          country={country}
          weather={weather}
          setCapital={setCapital}
        />
      : clickToShow
  )
}

export default Country