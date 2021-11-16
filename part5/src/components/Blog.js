import React, {useState} from 'react'

const Blog = ({blog, user, updateBlog}) => {
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () =>
    setVisible(!visible)

  const blogDetail = visible ? 'hide' : 'view'

  const addLike = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    updateBlog(blog.id, updatedBlog)
    setBlogObject(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p>
        <i>{blog.title}</i> by {blog.author} <button onClick={toggleVisibility}>{blogDetail}</button>
      </p>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>likes {blogObject.likes} <button id='like-button' onClick={addLike}>like</button></p>
        <p>{user.name}</p>
      </div>
    </div>
)}

export default Blog