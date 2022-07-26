import UserService from "../../services/users"
import { useEffect, useState } from "react"
import { List, ListItem } from "../List"
import { useNavigate } from "react-router-dom"

const UserView = () => (
  <>
    <h1>Users</h1>
    <UserList />
  </>
)

const UserList = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    UserService.getAll()
      .then(users => setUsers(users))
  }, [])

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id} header={user.username} onClick={() => navigate(`/posts/${user.id}`)}>
          {user.posts.length} posts
        </ListItem>
      ))}
    </List>
  )
}

export default UserView
