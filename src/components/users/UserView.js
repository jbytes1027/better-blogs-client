import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserService from "../../services/users"
import PostList from "../posts/PostList"

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
    <>
      <h1>{`${user.username} Posts`}</h1>
      <PostList filter={(i) => i.user.id === user.id} />
    </>
  )
}

export default UserView