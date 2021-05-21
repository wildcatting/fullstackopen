import React from 'react'

const PersonForm = ({addPerson, newName, setNewName, newNumber, setNewNumber}) =>
  <form onSubmit={addPerson}>
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

export default PersonForm