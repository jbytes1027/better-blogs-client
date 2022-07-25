import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="nav-bar">
      <Link to="/posts/all">Posts</Link>
      <Link to="/posts/create">Create Post</Link>
      <Link to="/users/all">Users</Link>
    </div>
  )
}

export default NavBar