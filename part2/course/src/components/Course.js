import React from 'react'

const Part = ({part}) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({course}) => {
  const sum = course.parts.reduce((s, p) =>  s + p.exercises, 0)
  return(
    <b>
      total of {sum} exercises
    </b>
  ) 
}

const Content = ({course}) => {
  return (
    <>
      <h3>{course.name}</h3>
      <div>
        {course.parts.map(parts => 
          <Part key={parts.id} part={parts} />
        )}
      </div>
      <Total key={course.id} course={course} />
    </>
  )
}

const Course = ({course}) => {
  console.log({course})  

  return (
    <>
      <h2>Web development curriculum</h2>
      <div>
        {course.map(course => 
          <Content key={course.id} course={course} />
        )}
      </div>  
    </>
  )
}

export default Course