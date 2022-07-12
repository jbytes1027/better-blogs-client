import { useState } from "react"
import { useDispatch } from "react-redux"

const BlogForm = ({ callback }) => {
  // TODO: use form hook
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const createBlog = (event) => {
    event.preventDefault()

    const newBlog = { title, author, url, likes: 0 }

    setTitle("")
    setAuthor("")
    setUrl("")

    callback()
    dispatch(createBlog(newBlog))
  }

  return (
    <form onSubmit={createBlog}>
      <div>
        title:{" "}
        <input
          id="blog-title-input"
          type="input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          id="blog-author-input"
          type="input"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          id="blog-url-input"
          type="input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
