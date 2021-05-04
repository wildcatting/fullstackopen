import React from 'react'
import Course from './components/Course'

const App = ({course}) => {
  console.log('props value is', {course})
  return (
    <>
      <Course course={course} />
    </>
  )
}

export default App