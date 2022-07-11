import Blog from "./Blog"

const BlogsList = ({ blogs, handleUpdateBlogs, user }) => {
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
            handleUpdateBlogs={handleUpdateBlogs}
            user={user}
          />
        ))}
    </>
  )
}

export default BlogsList
