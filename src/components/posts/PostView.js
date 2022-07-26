import { useDispatch, useSelector } from "react-redux"
import { fetchPosts, updatePost } from "../../state/postsReducer"
import { Link, useParams } from "react-router-dom"
import { notify } from "../../state/notificationReducer"
import { useForm } from "react-hook-form"
import { useState } from "react"
import PostService from "../../services/posts"
import { List } from "../List"

const PostView = () => {
  const params = useParams()
  const postId = params.postId
  const post = useSelector(state => state.posts?.find(p => p.id === postId))
  const dispatch = useDispatch()

  const onLike = () => {
    const updatedPost = { ...post }
    dispatch(updatePost(updatedPost))
  }

  if (!post) {
    dispatch(fetchPosts())
    return null
  }

  return (
    <>
      <h1>{post.title}</h1>
      <div className="post-details">
        <b>Written by:</b> {post.author}
        <br />
        <b>Url:</b> <a target="_blank" rel="noopener noreferrer" href={post.url}>{post.url}</a>
        <br />
        <b>Posted by:</b> <Link to={`/users/${post.user.id}`}>{post.user.username}</Link>
        <b> on</b> {new Date(post.time).toLocaleDateString()}
        <br />
        <b>Likes:</b> {post.likes}
      </div>
      <button onClick={onLike}>Like</button>
      <hr />
      <CreateCommentForm post={post} />
      <CommentList comments={post.comments} />
    </>
  )
}

const CommentList = ({ comments }) => (
  <List>
    {comments.slice().reverse().map((c, i) => (
      <div className="comment" key={i}>
        {c}
      </div>
    ))}
  </List>
)

const CreateCommentForm = ({ post }) => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, reset } = useForm({ shouldFocusError: false, mode: "onChange" })
  const { isValid } = formState
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    const commentText = data["input-comment"]

    try {
      setIsLoading(true)
      await PostService.comment(post.id, commentText)
      dispatch(fetchPosts())
      reset()
    } catch (error) {
      if (error.name === 'AxiosError') {
        dispatch(notify(error.message))
      } else {
        dispatch(notify("Error"))
      }
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id="input-comment" {...register("input-comment", { required: true })} />
      <button type="submit" disabled={!isValid || isLoading}>Comment</button>
    </form>
  )
}

export default PostView