import { useState } from "react"
import { useDispatch } from "react-redux"
import { addPost } from "../../state/postsReducer"
import PostService from "../../services/posts"

const CreatePostForm = () => {
  // TODO: use form hook
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()

    const newPost = { title, author, url, likes: 0 }

    const createdPost = await PostService.post(newPost)
    dispatch(addPost(createdPost))

    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={onSubmit}>
      <h1>
        Create a Post
      </h1>
      <div>
        Title:
        <br />
        <input
          id="input-post-title"
          type="input"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div>
        Author:
        <br />
        <input
          id="input-post-author"
          type="input"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        Url:
        <br />
        <input
          id="input-post-url"
          type="input"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
      <button type="cancel" disabled={true} >cancel</button>
    </form>
  )
}

export default CreatePostForm
