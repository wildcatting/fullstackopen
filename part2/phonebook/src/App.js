import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Jun Sung', number: '505-459-4511', id: 0 },
    { name: 'Sydney', number: '505-289-7995', id: 1 },
    { name: 'Jun-Min', number: '505-414-5277', id: 2 },
    { name: 'Matthew', number: '360-631-4272', id: 3 }
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

  const personsToShow = 
    filter === ''
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input 
          onChange={({target}) => setFilter(target.value)}
        />
      </div>
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>
          name: <input
            value={newName}
            onChange={({target}) => setNewName(target.value)}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={({target}) => setNewNumber(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div> 
    </>
  )
}

export default App 
