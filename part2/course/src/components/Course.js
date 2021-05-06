import React from 'react'

const Header = ({course}) => {
  return (
    <h1>
      {course.name}
    </h1>
  )
}

const Total = ({course}) => {
  const sum = course.parts.reduce((sum, part) => {
  console.log("what is happnn", sum, part)

    return sum + part.exercises
  }, 0)
  console.log("lol", sum)

  return(
    <b>
      total of {sum} exercises
    </b>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({course}) => {
  return (
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
      <Part part={course.parts[3]} />
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course