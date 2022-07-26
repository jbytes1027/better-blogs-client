import { Link } from "react-router-dom"

const NavBar = ({ loggedInUser }) => {
  let userElement = <Link to="/users/login">login</Link>
  if (loggedInUser) {
    userElement = <Link to={`/users/${loggedInUser.id}`} >{loggedInUser.username}</ Link>
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