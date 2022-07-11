import { createSlice } from "@reduxjs/toolkit"

// title: String,
// author: String,
// url: String,
// likes: Number,
// user:

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const blogIndex = state.findIndex((n) => n.id === action.payload)
      state.splice(blogIndex, 1)
    },
  },
})

export const { addBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
