import { useState, useEffect, useRef } from "react"
import BlogsList from "./components/BlogsList"
import BlogForm from "./components/BlogForm"
import BlogService from "./services/blogs"
import { notify, Type as notifyType, default as Notification } from "./components/Notification"
import Togglable from "./components/Togglable"
const axios = require("axios")

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const LoggedInUserLocalStorageKey = "BlogLoggedInUser"
  const togglableCreateNoteFormRef = useRef()

  useEffect(() => {
    const storedUser = JSON.parse(
      window.localStorage.getItem(LoggedInUserLocalStorageKey)
    )
    setUser(storedUser === "null" ? null : storedUser)
    if (storedUser) BlogService.setToken(storedUser.token)

    fetchBlogs()
  }, [])

  const createBlog = async (blog) => {
    togglableCreateNoteFormRef.current.toggleVisibility()

    await BlogService.post(blog)
    fetchBlogs()
  }

  const fetchBlogs = () => {
    BlogService.getAll().then((blogs) => setBlogs(blogs))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post("/api/login", { username, password })
      setUser(response.data)
      BlogService.setToken(response.data.token)
      window.localStorage.setItem(
        LoggedInUserLocalStorageKey,
        JSON.stringify(response.data)
      )
    } catch (e) {
      notify("unauthorized", notifyType.Error)
    } finally {
      setUsername("")
      setPassword("")
    }
  }

  const handleLogout = async () => {
    setUser(null)
    BlogService.setToken(null)
    window.localStorage.removeItem(LoggedInUserLocalStorageKey)
  }

  if (!user) {
    return (
      <div>
        <Notification />
        <h2>login</h2>
        <form onSubmit={handleLogin}>
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
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        {user.username} is logged in{" "}
        <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel={"new blog"} ref={togglableCreateNoteFormRef}>
          <BlogForm callback={createBlog} />
        </Togglable>
        <BlogsList blogs={blogs} handleUpdateBlogs={fetchBlogs} user={user} />
      </div>
    )
  }
}

export default App
