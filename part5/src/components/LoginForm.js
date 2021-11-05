import React from 'react'

const LoginForm = ({ handleSubmit, username, handleUsernameChange, password, handlePasswordChange }) => (
  <form onSubmit={handleSubmit}>
    <h2>login to blogs</h2>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUsernameChange}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>      
)

export default LoginForm