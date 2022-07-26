import { useDispatch } from "react-redux"
import { setUser } from "../../state/userReducer"
import { notify, Type as notifyType } from "../../state/notificationReducer"
import PostService from "../../services/posts"
import SessionService from "../../services/session"
import { LoggedInUserLocalStorageKey } from "../../config"
import { useForm } from "react-hook-form"
import { useState } from "react"

const LoginForm = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState } = useForm({ shouldFocusError: false, mode: "onChange" })
  const { isValid } = formState
  const [isLoading, setIsLoading] = useState(false)

  const tryLogin = async (username, password) => {
    try {
      const user = await SessionService.login(username, password)
      dispatch(setUser(user))
      PostService.setToken(user.token)
      window.localStorage.setItem(
        LoggedInUserLocalStorageKey,
        JSON.stringify(user)
      )
    } catch (e) {
      dispatch(notify("Error logging in", notifyType.Error))
    }
  }

  const onSubmit = (data) => {
    try {
      setIsLoading(true)
      tryLogin(data["input-login-username"], data["input-login-password"])
      setIsLoading(false)
    } catch (error) {
      if (error.name === 'AxiosError') {
        dispatch(notify(error.message))
      } else {
        dispatch(notify("Error"))
      }
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        Username
        <br />
        <input {...register("input-login-username", { required: true })} />
      </div>
      <div>
        Password
        <br />
        <input type="password" {...register("input-login-password", { required: true })} />
      </div>
      <button type="submit" disabled={!isValid || isLoading}>Login</button>
    </form>
  )
}

const LoginView = () => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
    </>
  )
}

export default LoginView
