import PostService from "../services/posts"
import { setPosts, updatePost, removePost as removeStorePost } from "./postsReducer"

export const fetchPosts = () => async (dispatch) => {
  const posts = await PostService.getAll()
  dispatch(setPosts(posts))
}

export const likePost = (post) => async (dispatch) => {
  const updatedPost = await PostService.like(post)
  dispatch(updatePost(updatedPost))
}

export const removePost = (post) => async (dispatch) => {
  await PostService.remove(post)
  dispatch(removeStorePost(post))
}
