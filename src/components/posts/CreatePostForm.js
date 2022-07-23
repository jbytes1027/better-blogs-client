import { useDispatch } from "react-redux"
import { addPost } from "../../state/postsReducer"
import PostService from "../../services/posts"
import { useForm } from "react-hook-form"
import { useState } from "react"

const CreatePostForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState } = useForm({ shouldFocusError: false, mode: "onChange" })
  const { isValid } = formState
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    const newPost = {}

    try {
      setIsLoading(true)
      const createdPost = await PostService.post(newPost)
      dispatch(addPost(createdPost))
    } catch (error) {
      setIsLoading(false)
    }
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
      <button type="submit" disabled={!isValid || isLoading}>create</button>
      <button type="cancel" >cancel</button>
    </form>
  )
}

export default CreatePostForm
