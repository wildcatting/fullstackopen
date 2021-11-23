import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm createBlog={mockHandler} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Man on the Margin' }
  })
  fireEvent.change(author, {
    target: { value: 'Michael Kendall' }
  })
  fireEvent.change(url, {
    target: { value: 'https://manonthemargin.com' }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Man on the Margin')
  expect(mockHandler.mock.calls[0][0].author).toBe('Michael Kendall')
  expect(mockHandler.mock.calls[0][0].url).toBe('https://manonthemargin.com')
})
