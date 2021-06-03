import React from 'react'

const Person = ({person, deletePerson}) =>
  <p>
    {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
  </p>

export default Person