import { createSlice } from "@reduxjs/toolkit"

// title: String,
// author: String,
// url: String,
// likes: Number,
// user:

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

export const { setPosts, addPost, updatePost, removePost } = postSlice.actions
export default postSlice.reducer
