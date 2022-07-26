import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { List, ListItem } from "../List"

const PostList = ({ filter }) => {
  const posts = useSelector((state) => state.posts)
  const navigate = useNavigate()

  if (!filter) filter = () => (true)

  return (
    <List>
      {posts
        .slice()
        .filter(filter)
        .sort((a, b) => b.likes - a.likes)
        .map((post) => (
          <ListItem key={post.id} header={post.title} onClick={() => navigate(`/posts/${post.id}`)}>
            by {post.author} • posted {new Date(post.time).toLocaleDateString()} • {post.likes} likes
          </ListItem>
        ))}
    </List>
  )
}

export default PostList