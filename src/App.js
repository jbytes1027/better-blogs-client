import { useEffect } from "react"
import CreatePostForm from "./components/posts/CreatePostForm"
import PostService from "./services/posts"
import { default as Notification } from "./components/Notification"
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
  const location = useLocation()

  useEffect(() => {
    const storedUser = JSON.parse(
      window.localStorage.getItem(LoggedInUserLocalStorageKey)
    )
    dispatch(setUser(storedUser === "null" ? null : storedUser))
    if (storedUser) PostService.setToken(storedUser.token)

    dispatch(fetchPosts())
  }, [])

  // eslint-disable-next-line no-unused-vars
  const handleLogout = async () => {
    dispatch(setUser(null))
    PostService.setToken(null)
    window.localStorage.removeItem(LoggedInUserLocalStorageKey)
  }

  if (!user && location.pathname !== '/login') return (<Navigate to="/login" />)

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:userId" element={<UserView />} />
        <Route path="/posts/create" element={<CreatePostForm />} />
        <Route path="/posts/:postId" element={<PostView />} />
      </Routes>
      <Notification />
    </div>
  )
}

export default App
