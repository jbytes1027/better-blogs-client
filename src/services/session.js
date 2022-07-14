import axios from "axios"
import { BACKEND_URL } from "../config"

const baseUrl = `${BACKEND_URL}/api`

const login = async (username, password) => {
  const res = await axios.post(`${baseUrl}/login`, { username, password })
  return res.data
}

export default { login }