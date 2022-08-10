import { useEffect } from "react"
import CreatePostView from "./components/posts/CreatePostView"
import { default as Notification } from "./components/Notification"
import { useDispatch, useSelector } from "react-redux"
import { fetchPosts } from "./state/postThunks"
import { tryLoginFromSaved } from "./state/userReducer"
import { Route, Routes, Navigate, useLocation } from "react-router"
import LoginView from "./components/users/LoginView"
import UsersView from "./components/users/UsersView"
import UserView from "./components/users/UserView"
import PostView from "./components/posts/PostView"
import NavBar from "./components/NavBar"
import PostsView from "./components/posts/PostsView"
import RegisterView from "./components/users/RegisterView"

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const location = useLocation()

  useEffect(() => {
    dispatch(tryLoginFromSaved())
    dispatch(fetchPosts())
  }, [dispatch])

  if (!user && location.pathname === "/posts/create")
    return <Navigate to="/users/login" />

  return (
    <>
      <NavBar loggedInUser={user} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/posts/all" />} />
          <Route path="/users/login" element={<LoginView />} />
          <Route path="/users/register" element={<RegisterView />} />
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
