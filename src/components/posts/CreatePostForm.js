import { useDispatch } from "react-redux"
import { addPost } from "../../state/postsReducer"
import PostService from "../../services/posts"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { notify } from "../../state/notificationReducer"

const CreatePostForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState } = useForm({ shouldFocusError: false, mode: "onChange" })
  const { isValid } = formState
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const newPost = {
      title: data["input-post-title"],
      author: data["input-post-author"],
      url: data["input-post-url"],
      likes: 0,
    }

    try {
      setIsLoading(true)
      const createdPost = await PostService.post(newPost)
      dispatch(addPost(createdPost))
      navigate(`/posts/${createdPost.id}`)
      setIsLoading(false)
    } catch (error) {
      if (error.name === 'AxiosError') {
        dispatch(notify(error.message))
      } else {
        dispatch(notify("Error"))
      }
      setIsLoading(false)
    }
  }

  const onBack = () => {
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>
        Create a Post
      </h1>
      <div>
        Title
        <br />
        <input {...register("input-post-title", { required: true })} />
      </div>
      <div>
        Author
        <br />
        <input {...register("input-post-author", { required: true })} />
      </div>
      <div>
        Url
        <br />
        <input {...register("input-post-url", { required: true })} />
      </div>
      <button type="submit" disabled={!isValid || isLoading}>Create</button>
      <button onClick={onBack}>Back</button>
    </form>
  )
}

export default CreatePostForm
