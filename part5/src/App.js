import React, {useEffect, useState} from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App =
    () => {
      const [blogs, setBlogs] = useState([])
      const [errorMessage, setErrorMessage] = useState(null)
      const [username, setUsername] = useState('')
      const [password, setPassword] = useState('')
      const [user, setUser] = useState(null)

      const handleLogin =
          async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({
            username,
            password,
          })

          window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {setErrorMessage(null)}, 5000)
        }
      }

      const handleLogout =
          async event => {
        event.preventDefault()
        try {
          window.localStorage.removeItem('loggedBlogAppUser')
          setUser(null)
        } catch (exception) {
          setErrorMessage('ulos kirjautuminen ei onnistu')
          setTimeout(() => {setErrorMessage(null)}, 5000)
        }
      }

      useEffect(() => {blogService.getAll().then(blogs => setBlogs(blogs))}, [])

      useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogService.setToken(user.token)
        }
      }, [])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>login to blogs</h2>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null 
        ? loginForm()
        : <div>
            <h2>blogs</h2>
            <p>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>            
            </p>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
      }
    </div>
  )
    }

export default App