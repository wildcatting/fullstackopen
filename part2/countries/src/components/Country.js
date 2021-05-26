import React from 'react'
import CountryView from './CountryView'

const Country = ({country, length, show, setShow, handleClick}) => {
  const clickToShow = show
  ? <div key={country.name}>
      {country.name}
      <button onClick={handleClick} id={country.name}>
        show
      </button>
      <br />
    </div>
  : <CountryView country={country} id={country.name} />

  return (
    length === 1
      ? <CountryView country={country} />
      : clickToShow
  )
}

export default Country