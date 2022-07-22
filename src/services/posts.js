import axios from "axios"
import { BACKEND_URL } from "../config"

const baseUrl = `${BACKEND_URL}/api/posts`

let token

const setToken = (newToken) => {
  token = newToken
}

const get = async (postId) => {
  const res = await axios.put(`${baseUrl}/${postId}`)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const post = async (post) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }

  const response = await axios.post(baseUrl, post, config)
  return response.data
}

const like = async (post) => {
  const likedPost = {
    ...post,
    likes: post.likes + 1,
  }
  const res = await axios.put(`${baseUrl}/${post.id}`, likedPost)
  return res.data
}

const remove = async (post) => {
  await axios.delete(`${baseUrl}/${post.id}`)
}

const exports = { like, getAll, get, post, setToken, remove }

export default exports
