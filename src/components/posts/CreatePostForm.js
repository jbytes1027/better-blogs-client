import { useState } from "react"
import { useDispatch } from "react-redux"

const CreatePostForm = ({ callback }) => {
  // TODO: use form hook
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const createPost = (event) => {
    event.preventDefault()

    const newPost = { title, author, url, likes: 0 }

    setTitle("")
    setAuthor("")
    setUrl("")

    callback()
    dispatch(createPost(newPost))
  }

  return (
    <form onSubmit={createPost}>
      <div>
        title:{" "}
        <input
          id="input-post-title"
          type="input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{" "}
        <input
          id="input-post-author"
          type="input"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{" "}
        <input
          id="input-post-url"
          type="input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreatePostForm
