import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    phoneService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    persons.some((person) => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : phoneService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
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
