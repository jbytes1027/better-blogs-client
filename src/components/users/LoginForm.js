import { useState } from "react"

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    setUsername("")
    setPassword("")

    onSubmit(username, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Username:{" "}
        <input
          type="input"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
