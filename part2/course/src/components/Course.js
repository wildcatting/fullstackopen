import React from 'react'

const Title = () =>
  <h2>
    Web development curriculum
  </h2>

const Header = ({children}) => 
  <h3>{children}</h3>

const Total = ({course}) => {
  const sum = course[0].parts.map(course => course.exercises)

  return(
    <b>
      total of {sum.reduce((s, p) => s + p)} exercises
    </b>
  ) 
}

const Part = ({part}) =>
    <p>
      {part.name} {part.exercises}
    </p>

const Content = ({course}) => {
  return (
    <>
      <Part part={course[0].parts[0]} />
      <Part part={course[0].parts[1]} />
      <Part part={course[0].parts[2]} />
      <Part part={course[0].parts[3]} />
    </>
  )
}

const Course = ({course}) => {
  console.log({course})  

  return (
    <>
      <Title />
      <Header>{course[0].name}</Header>
      <Content course={course} />
      <Total course={course} />
      <Header>{course[1].name}</Header>

    </>
  )
}

export default Course