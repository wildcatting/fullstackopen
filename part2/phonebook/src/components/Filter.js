import React from 'react'

const Filter = ({setFilter}) => 
  <>
    filter shown with: <input 
      onChange={({target}) => setFilter(target.value)}
    />
  </>

export default Filter