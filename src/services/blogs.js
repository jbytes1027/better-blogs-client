import axios from "axios"
import { BACKEND_URL } from "../config"

const baseUrl = `${BACKEND_URL}/api/blogs`

let token

const setToken = (newToken) => {
  token = newToken
}

const get = async (blogId) => {
  const res = await axios.put(`${baseUrl}/${blogId}`)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const post = async (blog) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const like = async (blog) => {
  const likedBlog = {
    ...blog,
    likes: blog.likes + 1,
  }
  const res = await axios.put(`${baseUrl}/${blog.id}`, likedBlog)
  return res.data
}

const remove = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`)
}

const exports = { like, getAll, get, post, setToken, remove }

export default exports
