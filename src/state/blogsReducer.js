import { createSlice } from "@reduxjs/toolkit"
import BlogService from "../services/blogs"

// title: String,
// author: String,
// url: String,
// likes: Number,
// user:

const fetchBlogs = () => async (dispatch) => {
  const blogs = await BlogService.getAll()
  dispatch(setBlogs(blogs))
}

const createBlog = (blog) => async (dispatch) => {
  const createdBlog = await BlogService.post(blog)
  dispatch(blogSlice.actions.addBlog(createdBlog))
}

const likeBlog = (blog) => async (dispatch) => {
  const updatedBlog = await BlogService.like(blog)
  dispatch(blogSlice.actions.updateBlog(updatedBlog))
}

const removeBlog = (blog) => async (dispatch) => {
  await BlogService.remove(blog)
  dispatch(blogSlice.actions.removeBlog(blog))
}

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const toUpdateBlogIndex = state.findIndex((b) => b.id === action.payload.id)
      state.splice(toUpdateBlogIndex, 1, action.payload)
    },
    removeBlog(state, action) {
      const blogIndex = state.findIndex((n) => n.id === action.payload.id)
      state.splice(blogIndex, 1)
    },
  },
})

export { fetchBlogs, createBlog, likeBlog, removeBlog }
export const { setBlogs } = blogSlice.actions
export default blogSlice.reducer
