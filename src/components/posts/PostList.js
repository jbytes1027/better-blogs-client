import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Post = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/posts/${post.id}`)
  }

  const timePosted = new Date(post.time)

  return (
    <div className="list-item" onClick={handleClick}>
      <div className={"list-item-title"}>
        {post.title}
      </div>
      by {post.author} • posted {timePosted.toLocaleDateString()} • {post.likes} likes
    </div>
  )
}

const PostList = ({ filter, title }) => {
  const posts = useSelector((state) => state.posts)

  if (!filter) filter = () => (true)
  if (!title) title = "Posts"

  return (
    <>
      <h1>{title}</h1>
      <div className="list">
        {posts
          .slice()
          .filter(filter)
          .sort((a, b) => b.likes - a.likes)
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
      </div>
    </>
  )
}

export default PostList