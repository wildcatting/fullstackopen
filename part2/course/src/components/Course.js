import React from 'react'

const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    },
    {
      name: 'Redux',
      exercises: 11
    }
  ]
}

const Header = () => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = () => {
//  const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises + course.parts[3].exercises
  const sum = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return(
    <b>total of {sum} exercises</b>
  ) 
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = () => {
  return (
    <>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
      <Part part={course.parts[3]} />
    </>
  )
}

const Course = () => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default Course