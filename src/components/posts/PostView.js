import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostService from "../../services/posts"

const PostView = () => {
  const params = useParams()
  const postId = params.postId
  const [post, setPost] = useState(null)

  useEffect(() => {
    PostService.get(postId)
      .then(user => setPost(user))
  }, [])

  if (!post) return null

  return (
    <div>
      <h2>{post.title}</h2>
      {post.url}
    </div>
  )
}

export default PostView