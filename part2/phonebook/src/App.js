import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Jun', number: '505-459-4511', id: 0 },
    { name: 'Syd', number: '505-289-7995', id: 1 },
    { name: 'Jun-Min', number: '505-414-5277', id: 2 },
    { name: 'Matt', number: '360-631-4272', id: 3 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length
    }

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
