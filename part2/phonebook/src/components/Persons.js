import React from 'react'
import Person from './Person'

const Persons = ({filter, persons, deletePerson}) => {
  const personsToShow = 
  filter === ''
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )

  return (
    <>
      {personsToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={deletePerson} />
      )}
    </> 
  )
}

export default Persons