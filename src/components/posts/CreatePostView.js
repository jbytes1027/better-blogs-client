import { useDispatch } from "react-redux"
import { addPost } from "../../state/postsReducer"
import PostService from "../../services/posts"
import { useNavigate } from "react-router-dom"
import { notify } from "../../state/notificationReducer"
import Form from "../Form"

const CreatePostForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const newPost = {
      title: data["input-post-title"],
      author: data["input-post-author"],
      url: data["input-post-url"],
      likes: 0,
    }

    try {
      const createdPost = await PostService.post(newPost)
      dispatch(addPost(createdPost))
      navigate(`/posts/${createdPost.id}`)
      return true
    } catch (error) {
      if (error.name === "AxiosError") {
        dispatch(notify(error.message))
      } else {
        dispatch(notify("Error"))
      }
      return false
    }
  }

  let formInputs = [
    {
      text: "Title",
      id: "input-post-title",
    },
    {
      text: "Author",
      id: "input-post-author",
    },
    {
      text: "URL",
      id: "input-post-url",
    },
  ]

  return (
    <Form inputs={formInputs} submitText="Create" onAsyncSubmit={onSubmit} />
  )
}

const CreatePostView = () => (
  <>
    <h1>Create a Post</h1>
    <CreatePostForm />
  </>
)

export default CreatePostView
