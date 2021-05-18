import React, { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const newPerson = {
    name: newName,
    id: persons.length + 1,
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons != 0) {
      persons.forEach(function(item, index, array) {
        console.log('loop thru persons', item, index, array)
        if (persons[index].name === newName) {
          alert(
            `${newName} is already added to phonebook`
          )
        }
        return (
          setPersons(persons.concat(newPerson)),
          setNewName('')
        )
      })
      return (
        event.preventDefault(),
        setNewName('')
      )
    } 
    return (
      setPersons(persons.concat(newPerson)),
      setNewName('')
    )
  }

  const handleAddPerson = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  console.log('persons', persons)
  console.log('newName', newName)
  console.log('newPerson', newPerson)

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
      <div>debug: {newName}</div>
    </div>
  )
}

export default App 
