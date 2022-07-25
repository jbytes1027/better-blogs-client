// display all users and their posts created

import UserService from "../../services/users"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const User = ({ user }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/users/${user.id}`)
  }

  return (
    <div className="list-item" onClick={handleClick}>
      <div className={"list-item-title"} onClick={handleClick}>
        {user.username}
      </div>
      {user.posts.length} posts
    </div>
  )
}

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    UserService.getAll()
      .then(users => setUsers(users))
  }, [])

  return (
    <div>
      <h1>Users</h1>
      <div className="list">
        {users.map((u) => (
          <User key={u.id} user={u} />
        ))}
      </div>
    </div>
  )
}

export default UserList
