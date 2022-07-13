import { useEffect, useRef } from "react"
import BlogsList from "./components/blogs/BlogsList"
import BlogForm from "./components/blogs/BlogForm"
import BlogService from "./services/blogs"
import { default as Notification } from "./components/Notification"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { fetchBlogs } from "./state/blogsReducer"
import { setUser } from "./state/userReducer"
import { Route, Routes } from "react-router"
import LoginView from "./components/users/LoginView"
import { LoggedInUserLocalStorageKey } from "./config"
import UserList from "./components/users/UserList"
import UserView from "./components/users/UserView"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const togglableCreateNoteFormRef = useRef()

  useEffect(() => {
    const storedUser = JSON.parse(
      window.localStorage.getItem(LoggedInUserLocalStorageKey)
    )
    dispatch(setUser(storedUser === "null" ? null : storedUser))
    if (storedUser) BlogService.setToken(storedUser.token)

    dispatch(fetchBlogs())
  }, [])

  const onSubmitCallback = async () => {
    togglableCreateNoteFormRef.current.toggleVisibility()
  }

  const handleLogout = async () => {
    dispatch(setUser(null))
    BlogService.setToken(null)
    window.localStorage.removeItem(LoggedInUserLocalStorageKey)
  }

  const CreateView = () => (
    <div>
      {user.username} is logged in{" "}
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel={"new blog"} ref={togglableCreateNoteFormRef}>
        <BlogForm callback={onSubmitCallback} />
      </Togglable>
      <BlogsList />
    </div>
  )

  return (
    <div>
      <Notification />
      <Routes>
        <Route path="/" element={<CreateView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserView />} />
      </Routes>
    </div >
  )
}

export default App
