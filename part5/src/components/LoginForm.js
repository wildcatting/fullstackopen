import React from 'react'

const LoginForm = (props) => (
  <form onSubmit={props.handleLogin}>
    <h2>login to blogs</h2>
    <div>
      username
      <input
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => props.setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

export default LoginForm