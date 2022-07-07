import BlogService from "../services/blogs"

const Blog = ({ blog, handleUpdateBlogs, user }) => {
  const likeBlog = async () => {
    await BlogService.like(blog)
    handleUpdateBlogs()
  }

  const removeBlog = async () => {
    await BlogService.remove(blog)
    handleUpdateBlogs()
  }

  const isUserCreator = user.username === blog.user.username

  return (
    <div className='blog'>
      {blog.title} {blog.author} {blog.likes} <button onClick={likeBlog} >like</button>{isUserCreator && <button onClick={removeBlog}>remove</button>}
    </div>
  )
}

export default Blog