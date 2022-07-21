import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
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
    <div className="post-view">
      <div className="post-title">{post.title}</div>
      By: {post.author}
      <br />
      Url: <Link to={post.url}>{post.url}</Link>
      <br />
      Posted by: <Link to={`/users/${post.user.username}`}>{post.user.username}</Link>
      <br />
      Likes: {post.likes}
    </div>
  )
}

export default PostView