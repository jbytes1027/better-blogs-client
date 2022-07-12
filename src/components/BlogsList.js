import Blog from "./Blog"

const BlogsList = ({ blogs, user }) => {
  return (
    <>
      <h2>blogs</h2>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
          />
        ))}
    </>
  )
}

export default BlogsList
