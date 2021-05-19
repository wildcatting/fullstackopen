import React, { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Jun', number: '505-459-4511', id: 0 },
    { name: 'Syd', number: '505-289-7995', id: 1 },
    { name: 'Hrob', number: '505-414-5277', id: 2 },
    { name: 'Matt', number: '360-631-4272', id: 3 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
//  const [showAll, setShowAll] = useState(true)


  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      duplicate: false,
      id: persons.length
    }

    function included() {
      for (let i = 0; i < persons.length; i++) {
        if (persons[i].name === newName) {
          return (
            newPerson.duplicate = true
          )
        }
      }
    }
    included()

    newPerson.duplicate
    ? alert(
        `${newName} is already added to phonebook`
      )
    : setPersons(persons.concat(newPerson))

    console.log('newPerson', newPerson)

    setNewName('')
    setNewNumber('')
  }

  const handleAddName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleAddNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

/*   const personsToShow = showAll
  ? persons
  : persons.filter(person => person.important) */

  console.log('phonebook', persons)

  persons.forEach(function(item, index) {
    console.log('phonebook:', persons[index].name, persons[index].number)
  })
  
  console.log('phonebook length:', persons.length)

  return (
    <>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input />
      </div>
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <div>
          name: <input
            value={newName}
            onChange={handleAddName}
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
    </>
  )
}

export default App 
