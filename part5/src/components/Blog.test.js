import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('test blog components', () => {
  const blog = {
    title: 'The Masculinist',
    author: 'Aaron Renn',
    url: 'https://themasculinist.com',
    likes: '111111'
  }

  test('renders content', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'The Masculinist by Aaron Renn'
    )

  })

  test('clicking the button displays url and likes', () => {
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} toggleImportance={mockHandler} />
    )

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'https://themasculinist.com'
    )

    expect(component.container).toHaveTextContent(
      '111111'
    )
  })
})
