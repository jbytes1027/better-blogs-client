// display all users and their blogs created

import axios from "axios"
import { useEffect, useState } from "react"

const User = ({ user }) => (
  <div>
    {user.username}: has {user.blogs.length} posts
  </div>
)

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const res = await axios.get("/api/users")
    setUsers(res.data)
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
