// display all users and their blogs created

import UserService from "../../services/users"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const User = ({ user }) => (
  <div>
    <Link to={user.id}>{user.username}</Link>: has {user.blogs.length} posts
  </div>
)

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    UserService.getAll()
      .then(users => setUsers(users))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      {users.map((u) => (
        <User key={u.id} user={u} />
      ))}
    </div>
  )
}

export default UserList
