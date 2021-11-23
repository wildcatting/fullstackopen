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

  const mockHandler = jest.fn()

  test('renders content', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'The Masculinist by Aaron Renn'
    )

  })

  test('clicking the button displays url and likes', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
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

  test('calls the update handler twice when clicking "like" twice', () => {
    const component = render(
      <Blog blog={blog} updateBlog={mockHandler} />
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
