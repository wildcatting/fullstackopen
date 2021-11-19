import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'The Masculinist',
    author: 'Aaron Renn',
    url: 'https://themasculinist.com',
    likes: '111111'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'The Masculinist by Aaron Renn'
  )

})
