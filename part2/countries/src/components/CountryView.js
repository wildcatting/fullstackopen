import React from 'react'

const CountryView = ({country, weather}) =>
  <>
    <h2>{country.name}</h2>
    <p>capital: {country.capital}</p>
    <p>population: {country.population}</p>
    <h3>languages: </h3>
    <ul>
      {country.languages.map((lang, i) => (
        <li key={i}>{lang.name}</li>
      ))}
    </ul>
    <img src={country.flag} width="200" alt={`Flag of ${country.name}`} />
    <h3>Weather in {country.capital}</h3>
    <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
    <img src={weather.current.weather_icons} width='100' alt={`Weather in ${country.capital} is ${weather.current.weather_descriptions}`} />
    <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
  </>

export default CountryView