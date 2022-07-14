import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BlogService from "../../services/blogs"

const BlogView = () => {
  const params = useParams()
  const blogId = params.blogId
  const [blog, setBlog] = useState(null)

  useEffect(() => {
    BlogService.get(blogId)
      .then(user => setBlog(user))
  }, [])

  if (!blog) return null

  return (
    <div>
      <h2>{blog.title}</h2>
      {blog.url}
    </div>
  )
}

export default BlogView