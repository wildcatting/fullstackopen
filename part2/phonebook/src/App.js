import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    event.preventDefault()

    if (persons > 0) {
      persons.forEach(function(index) {
        if (persons[index].name === newName) {
          alert(
            `${newName} is already added to phonebook`
          )
          persons.pop()
          newPerson.id = persons.length
        }
        return (
          setPersons(persons.concat(newPerson)),
          setNewName(''),
          setNewNumber(''),
          newPerson.id = persons.length
        )
      })
    } 
    return (
      setPersons(persons.concat(newPerson)),
      setNewName(''),
      setNewNumber(''),
      newPerson.id = persons.length
    )
  }

  const handleAddPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  console.log('persons', persons)
  console.log('newName', newName)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleAddPerson}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleAddNumber}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Numbers</h2>
      <div>
        {persons.map(person =>
          <Person key={person.id} person={person} />
        )}
      </div> 
    </div>
  )
}

export default App 
