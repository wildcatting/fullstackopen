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

    const existingEntry = persons.find((person) => person.name === newName)

    if (existingEntry) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        phoneService
          .update(existingEntry.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map((person) => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            alert(
              `${existingEntry.name}' was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== existingEntry.id))
          })
    } else {
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

    const deletePerson = (id) => {
      const person = persons.find(p => p.id === id)
      
      if (window.confirm(`Delete ${person.name}?`))
      phoneService
        .deleteEntry(id)
        .then(() => {
          phoneService
            .getAll()
            .then(persons => {
              setPersons(persons)
            })
        })
        .catch(error => {
          alert(
            `${person.name}' was already deleted from server`
          )
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
      <Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </>
  )
}

export default App 
