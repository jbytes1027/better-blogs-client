import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "../../state/userReducer"
import LoginForm from "./LoginForm"
import { notify, Type as notifyType } from "../../state/notificationReducer"
import BlogService from "../../services/blogs"
import { LoggedInUserLocalStorageKey } from "../../config"

const LoginView = () => {
  const dispatch = useDispatch()

  const handleLoginAttempt = async (username, password) => {
    try {
      const response = await axios.post("/api/login", { username, password })
      dispatch(setUser(response.data))
      BlogService.setToken(response.data.token)
      window.localStorage.setItem(
        LoggedInUserLocalStorageKey,
        JSON.stringify(response.data)
      )
    } catch (e) {
      notify("unauthorized", notifyType.Error)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onSubmit={handleLoginAttempt} />
    </div>
  )
}

export default LoginView
