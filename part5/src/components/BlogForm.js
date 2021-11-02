import React from 'react'

const BlogForm = (props) => {
  
  return (
    <form onSubmit={props.addBlog}>
        <h2>create new</h2>
        <div>
        title
        <input {...props.title} />
        </div>
        <div>
        author
        <input {...props.author} />
        </div>
        <div>
        url
        <input {...props.url} />
        </div>
        <button type="submit">create</button>
    </form>
  )
}

export default BlogForm