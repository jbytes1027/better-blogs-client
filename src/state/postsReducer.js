import { createSlice } from "@reduxjs/toolkit"
import PostService from "../services/posts"

// title: String,
// author: String,
// url: String,
// likes: Number,
// user:

const fetchPosts = () => async (dispatch) => {
  const posts = await PostService.getAll()
  dispatch(setPosts(posts))
}

const updatePost = (post) => async (dispatch) => {
  const updatedPost = await PostService.like(post)
  dispatch(postSlice.actions.updatePost(updatedPost))
}

const removePost = (post) => async (dispatch) => {
  await PostService.remove(post)
  dispatch(postSlice.actions.removePost(post))
}

const postSlice = createSlice({
  name: "post",
  initialState: [],
  reducers: {
    setPosts(state, action) {
      return action.payload
    },
    addPost(state, action) {
      state.push(action.payload)
    },
    updatePost(state, action) {
      const toUpdatePostIndex = state.findIndex(
        (b) => b.id === action.payload.id
      )
      state.splice(toUpdatePostIndex, 1, action.payload)
    },
    removePost(state, action) {
      const postIndex = state.findIndex((n) => n.id === action.payload.id)
      state.splice(postIndex, 1)
    },
  },
})

export { fetchPosts, updatePost, removePost }
export const { setPosts, addPost } = postSlice.actions
export default postSlice.reducer
