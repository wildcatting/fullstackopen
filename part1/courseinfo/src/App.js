import React from 'react'

const Header = ({course}) => {
  return (
      <h1>{course.name}</h1>
  )
}

const Part = ({course}) => {
  return (
    <p>
      {course.name} {course.exercise}
    </p>
  )
}

const Content = ({course}) => {
  return (
    <>
      <Part course={course.parts[0]}/>
      <Part course={course.parts[1]}/>
      <Part course={course.parts[2]}/>
    </>    
  )
}

const Total = ({course}) => {
  return (
    <p>
        Number of exercises {course.parts[0].exercise + course.parts[1].exercise + course.parts[2].exercise}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercise: 10},
      {name: 'Using props to pass data', exercise: 7},
      {name: 'State of a component', exercise: 14}
    ]
  }

  return (
    <>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </>
  )
}

export default App