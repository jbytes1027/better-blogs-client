import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Post = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/posts/${post.id}`)
  }

  const timePosted = new Date(post.time)

  return (
    <div className="post" onClick={handleClick}>
      <div className={"post-title"}>
        {post.title}
      </div>
      by {post.author} • posted {timePosted.toLocaleDateString()} • {post.likes} likes
    </div>
  )
}

const PostList = () => {
  const posts = useSelector((state) => state.posts)

  return (
    <div className="posts">
      <h1>Posts</h1>
      {posts
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  )
}

export default PostList