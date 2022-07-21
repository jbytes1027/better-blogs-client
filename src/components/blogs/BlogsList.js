import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Post = ({ blog }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/blogs/${blog.id}`)
  }

  return (
    <div className="post" onClick={handleClick}>
      <div className={"post-title"}>
        {blog.title}
      </div>
      by {blog.author}
    </div >
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
          <Post key={blog.id} blog={blog} />
        ))}
    </>
  )
}

export default BlogsList