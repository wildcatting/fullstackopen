import React from 'react'

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  )
}

export default Person