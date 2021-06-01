import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    axios
    .post('http://localhost:3001/persons', newPerson)
    .then(response => {
      setPersons(persons.concat(response.data))
    })

    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat(newPerson))

    setNewName('')
    setNewNumber('')
    }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        setNewName={setNewName} 
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} />
    </>
  )
}

export default App 
