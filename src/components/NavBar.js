import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const NavBar = () => {
  const user = useSelector((state) => state.user)

  let userElement = <Link to="/users/login">Login</Link>
  if (user?.username) {
    userElement = <Link to={`/users/${user.id}`}>{user.username}</Link>
  }

  return (
    <div className="nav-bar">
      <Link to="/posts/all">Posts</Link>
      <Link to="/posts/create">Create Post</Link>
      <Link to="/users/all">Users</Link>
      <hr />
      {userElement}
    </div>
  )
}

export default NavBar
