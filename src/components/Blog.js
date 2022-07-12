import BlogService from "../services/blogs"
import { fetchBlogs } from "../state/blogsReducer"

const Blog = ({ blog, user }) => {
  const likeBlog = async () => {
    await BlogService.like(blog)
    fetchBlogs()
  }

  const removeBlog = async () => {
    await BlogService.remove(blog)
    fetchBlogs()
  }

  const isUserCreator = user.username === blog.user.username

  return (
    <div className="blog">
      {blog.title} {blog.author} {blog.likes}{" "}
      <button onClick={likeBlog}>like</button>
      {isUserCreator && <button onClick={removeBlog}>remove</button>}
    </div>
  )
}

export default Blog
