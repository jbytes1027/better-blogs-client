import { useEffect } from "react"
import CreatePostView from "./components/posts/CreatePostView"
import PostService from "./services/posts"
import { default as Notification } from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "./state/postsReducer"
import { setUser } from "./state/userReducer"
import { Route, Routes, Navigate, useLocation } from "react-router"
import LoginView from "./components/users/LoginView"
import { LoggedInUserLocalStorageKey } from "./config"
import UsersView from "./components/users/UsersView"
import UserView from "./components/users/UserView"
import PostView from "./components/posts/PostView"
import NavBar from "./components/NavBar"
import PostsView from "./components/posts/PostsView"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const location = useLocation()

  useEffect(() => {
    handleTryLoginSaved()

    dispatch(fetchPosts())
  }, [])

  const handleTryLoginSaved = async () => {
    const storedUser = JSON.parse(
      window.localStorage.getItem(LoggedInUserLocalStorageKey)
    )
    dispatch(setUser(storedUser === "null" ? null : storedUser))
    if (storedUser) PostService.setToken(storedUser.token)
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = async () => {
    dispatch(setUser(null))
    PostService.setToken(null)
    window.localStorage.removeItem(LoggedInUserLocalStorageKey)
  }

  if (!user && location.pathname !== '/login') return (<Navigate to="/login" />)

  return (
    <>
      <NavBar loggedInUser={user} />
      <div className="content">
        <Routes>
          <Route path="/users/login" element={<LoginView />} />
          <Route path="/users/all" element={<UsersView />} />
          <Route path="/users/:userId" element={<UserView />} />
          <Route path="/posts/all" element={<PostsView />} />
          <Route path="/posts/create" element={<CreatePostView />} />
          <Route path="/posts/:postId" element={<PostView />} />
          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </div>
      <Notification />
    </>
  )
}

export default App
