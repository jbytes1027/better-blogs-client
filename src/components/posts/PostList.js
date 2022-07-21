import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Post = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/posts/${post.id}`)
  }

  return (
    <div className="post" onClick={handleClick}>
      <div className={"post-title"}>
        {post.title}
      </div>
      by {post.author}
    </div>
  )
}

const PostList = () => {
  const posts = useSelector((state) => state.posts)

  return (
    <>
      <h2>posts</h2>
      {posts
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((post) => (
          <Post key={post.id} post={post} />
        ))}
    </>
  )
}

export default PostList