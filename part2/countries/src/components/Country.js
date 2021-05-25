import React from 'react'

const Country = ({country, length}) =>
  length === 1
    ? <>
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
      </>
    : <p>{country.name}</p>

export default Country