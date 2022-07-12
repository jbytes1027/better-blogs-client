import { useDispatch } from "react-redux"
import { likeBlog, removeBlog } from "../state/blogsReducer"

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const isUserCreator = user.username === blog.user.username

  return (
    <div className="blog">
      {blog.title} {blog.author} {blog.likes}{" "}
      <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      {isUserCreator && <button onClick={() => dispatch(removeBlog(blog))}>remove</button>}
    </div>
  )
}

export default Blog
