import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title
        <input
          id='title'
          type='text'
          value={title}
          name='Title'
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <div>
        author
        <input
          id='author'
          type="text"
          value={author}
          name='Author'
          onChange={event => setAuthor(event.target.value)}
        />
      </div>
      <div>
        url
        <input
          id='url'
          type="url"
          value={url}
          name='Url'
          onChange={event => setUrl(event.target.value)}
        />
      </div>
      <div>
        <button id="create-button" type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm