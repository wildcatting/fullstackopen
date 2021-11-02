import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
    } catch (exception) {
      setErrorMessage('cannot logout')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const createBlog = async (BlogToAdd) => {
    try {
      const createdBlog = await blogService
        .create(BlogToAdd)
      setErrorMessage(
        `Blog ${BlogToAdd.title} was successfully added`
      )
      setBlogs(blogs.concat(createdBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch(exception) {
      setErrorMessage(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setErrorMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null 
        ? <LoginForm 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            setPassword={setPassword}
            password={password}
          />
        : <div>
            <h2>blogs</h2>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>            
            </p>
            <BlogForm createBlog={createBlog} />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </div>
  )
}

export default App