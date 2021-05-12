import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newPerson, setNewPerson] = useState('')
  const [showAll, setShowAll] = useState(true)

  const [ newName, setNewName ] = useState('Arto')

  const addNote = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      id: persons.length + 1,
    }
  
    setPersons(persons.concat(personObject))
    setNewPerson('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const notesToShow = showAll
  ? persons
  : persons.filter(persons => persons.important)


  console.log('persons', persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
        <div>
          name: <input 
            value={newPerson}
            onChange={handleNoteChange}
          />
        </div>
        <button type="submit">add</button>
      </form>   

      <h2>Numbers</h2>
      <p>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </p> 
    </div>
  )
}

export default App 
