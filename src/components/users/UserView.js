import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import UserService from "../../services/users"
import { logout } from "../../state/userReducer"
import PostList from "../posts/PostList"

const UserView = () => {
  const params = useParams()
  const [user, setUser] = useState(null)
  const loggedInUser = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (params.userId)
      UserService.getUser(params.userId).then((user) => setUser(user))
    else setUser(null)
  }, [params.userId])

  if (!user) return null

  if (user.id === loggedInUser?.id) {
    return (
      <>
        <h1>{user.username} Profile</h1>
        <button onClick={() => navigate("/posts/create")}>Create Post</button>
        <button onClick={() => dispatch(logout())}>Logout</button>
        <h2>Posts</h2>
        <PostList filter={(i) => i.user.id === user.id} />
      </>
    )
  } else {
    return (
      <>
        <h1>{user.username} Posts</h1>
        <PostList filter={(i) => i.user.id === user.id} />
      </>
    )
  }
}

export default UserView
