import { useDispatch } from "react-redux"
import { setUser } from "../../state/userReducer"
import LoginForm from "./LoginForm"
import { notify, Type as notifyType } from "../../state/notificationReducer"
import PostService from "../../services/posts"
import SessionService from "../../services/session"
import { LoggedInUserLocalStorageKey } from "../../config"

const LoginView = () => {
  const dispatch = useDispatch()

  const handleLoginAttempt = async (username, password) => {
    try {
      const user = await SessionService.login(username, password)
      dispatch(setUser(user))
      PostService.setToken(user.token)
      window.localStorage.setItem(
        LoggedInUserLocalStorageKey,
        JSON.stringify(user)
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
