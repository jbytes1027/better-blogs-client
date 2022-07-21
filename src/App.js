import { useEffect, useRef } from "react"
import PostList from "./components/posts/PostList"
import CreatePostForm from "./components/posts/CreatePostForm"
import PostService from "./services/posts"
import { default as Notification } from "./components/Notification"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "./state/postsReducer"
import { setUser } from "./state/userReducer"
import { Route, Routes, Navigate, useLocation } from "react-router"
import LoginView from "./components/users/LoginView"
import { LoggedInUserLocalStorageKey } from "./config"
import UserList from "./components/users/UserList"
import UserView from "./components/users/UserView"
import PostView from "./components/posts/PostView"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const togglableCreateNoteFormRef = useRef()
  const location = useLocation()

  useEffect(() => {
    const storedUser = JSON.parse(
      window.localStorage.getItem(LoggedInUserLocalStorageKey)
    )
    dispatch(setUser(storedUser === "null" ? null : storedUser))
    if (storedUser) PostService.setToken(storedUser.token)

    dispatch(fetchPosts())
  }, [])

  const onSubmitCallback = async () => {
    togglableCreateNoteFormRef.current.toggleVisibility()
  }

  const handleLogout = async () => {
    dispatch(setUser(null))
    PostService.setToken(null)
    window.localStorage.removeItem(LoggedInUserLocalStorageKey)
  }

  const CreateView = () => (
    <div>
      {user.username} is logged in{" "}
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel={"new post"} ref={togglableCreateNoteFormRef}>
        <CreatePostForm callback={onSubmitCallback} />
      </Togglable>
      <PostList />
    </div>
  )

  if (!user && location.pathname !== '/login') return (<Navigate to="/login" />)

  return (
    <div>
      <Notification />
      <Routes>
        <Route path="/" element={<CreateView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserView />} />
        <Route path="/posts/:postId" element={<PostView />} />
      </Routes>
    </div>
  )
}

export default App
