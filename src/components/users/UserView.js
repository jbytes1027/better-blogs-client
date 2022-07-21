import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserService from "../../services/users"

const UserView = () => {
  const params = useParams()
  const userId = params.userId
  const [user, setUser] = useState(null)

  useEffect(() => {
    UserService.getUser(userId)
      .then(user => setUser(user))
  }, [])

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      {user.posts.map((b) => (
        <div key={b.id}>
          {b.title}
        </div>
      ))}
    </div>
  )
}

export default UserView