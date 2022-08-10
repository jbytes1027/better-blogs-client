import axios from "axios"
import { BACKEND_URL } from "../config"

const baseUrl = `${BACKEND_URL}/api/users`

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const UserService = { getAll, getUser }
export default UserService
