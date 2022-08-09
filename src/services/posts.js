import store from "../state/store"
import axios from "axios"
import { BACKEND_URL } from "../config"

const baseUrl = `${BACKEND_URL}/api/posts`

const getCurrToken = () => {
  return store.getState().user.token
}

const getAuthHeaderConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getCurrToken()}`,
      "Content-Type": "application/json",
    },
  }
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
  const response = await axios.post(baseUrl, post, getAuthHeaderConfig())
  return response.data
}

const comment = async (postId, comment) => {
  const commentJson = {
    message: comment,
  }

  const response = await axios.post(
    `${baseUrl}/${postId}/comments`,
    commentJson,
    getAuthHeaderConfig()
  )

  return response.data
}

const like = async (post) => {
  const likedPost = {
    likes: post.likes + 1,
  }
  const res = await axios.put(
    `${baseUrl}/${post.id}`,
    likedPost,
    getAuthHeaderConfig()
  )
  return res.data
}

const remove = async (post) => {
  await axios.delete(`${baseUrl}/${post.id}`, getAuthHeaderConfig())
}

export default { like, getAll, get, post, remove, comment }
