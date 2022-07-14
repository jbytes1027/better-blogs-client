import { useDispatch, useSelector } from "react-redux"
import { likeBlog, removeBlog } from "../../state/blogsReducer"

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const isUserCreator = user.username === blog.user.username

  return (
    <div className="blog">
      {blog.title} {blog.author} {blog.likes}{" "}
      <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      {isUserCreator && (
        <button onClick={() => dispatch(removeBlog(blog))}>remove</button>
      )}
    </div>
  )
}

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <h2>blogs</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default BlogsList
