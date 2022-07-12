import { useSelector } from "react-redux"
import Blog from "./Blog"

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
