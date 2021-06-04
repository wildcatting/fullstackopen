import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [color, setColor] = useState('')

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
            setErrorMessage(`${existingEntry.name}'s number was updated`)
            setColor('green')
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`${existingEntry.name}'s information has already been removed from server`)
            setColor('red')
            setPersons(persons.filter(p => p.id !== existingEntry.id))
          })
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
    } else {
      phoneService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`Added ${newPerson.name}`)
          setColor('green')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`${error.response.data.error}`);
          console.log(error.response.data);
        });
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
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
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} result={color} />
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
