import axios from "axios"
const baseUrl = "/api/blogs"

let token

const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
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
  blog.likes += 1
  await axios.put(baseUrl + "/" + blog.id, blog)
}

const remove = async (blog) => {
  await axios.delete(`${baseUrl}/${blog.id}`)
}

const exports = { like, getAll, post, setToken, remove }

export default exports
