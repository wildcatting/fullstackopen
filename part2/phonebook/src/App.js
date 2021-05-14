import React, { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      id: persons.length + 1,
    }

    if (personObject.name === persons.name) {
      return (
        <div>
          debug: {newName}
        </div>
      )
    } 
    return (
      setPersons(persons.concat(personObject)),
      setNewName('')
    )
  }

  const handleAddPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  console.log('persons', persons)

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
        <button type="submit">add</button>
      </form>   

      <h2>Numbers</h2>
      <div>
        {persons.map(note =>
          <Note key={note.id} note={note} />
        )}
      </div> 
    </div>
  )
}

export default App 
