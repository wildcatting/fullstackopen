import axios from 'axios'
import React, {useEffect, useState} from 'react'

import DisplayCountries from './components/DisplayCountries'

const App =
    () => {
      const [countries, setCountries] = useState([])
      const [filter, setFilter] = useState('')
      const [show, setShow] = useState(true)

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

        const handleClick = (event) => { setFilter(event.target.id); };

  return (
    <>
      <div>
        find countries: <input
  onChange = { ({target}) => setFilter(target.value) } />
      </div > <
             DisplayCountries
        countries={countries} 
        filter={filter} 
        show={show} 
        setShow={setShow} 
        handleClick={
    (event) => handleClick(event)}
      />
    </>
  )
    }

export default App;
