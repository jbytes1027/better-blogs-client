import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { List, ListItem } from "../List"

const PostList = ({ filter: postsFilter }) => {
  const posts = useSelector((state) => state.posts)
  const navigate = useNavigate()

  if (!postsFilter) postsFilter = () => true

  const filteredPosts = posts.slice().filter(postsFilter)
  if (!filteredPosts || filteredPosts.length === 0) {
    return <h2>No Posts Found</h2>
  }

  return (
    <List>
      {filteredPosts
        .sort((a, b) => b.likes - a.likes)
        .map((post) => (
          <ListItem
            key={post.id}
            header={post.title}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            by {post.author} • posted {new Date(post.time).toLocaleDateString()}{" "}
            • {post.likes} likes
          </ListItem>
        ))}
    </List>
  )
}

export default PostList
