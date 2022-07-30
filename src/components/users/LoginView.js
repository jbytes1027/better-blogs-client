import { useDispatch } from "react-redux"
import { login } from "../../state/userReducer"
import { notify, Type as notifyType } from "../../state/notificationReducer"
import SessionService from "../../services/session"
import Form from "../Form"

const LoginForm = () => {
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    try {
      const user = await SessionService.login(data["input-username"], data["input-password"])
      dispatch(login(user))
      return true
    } catch (error) {
      if (error.name === 'AxiosError') {
        dispatch(notify(error.message))
      } else {
        dispatch(notify("Error logging in", notifyType.Error))
      }
      return false
    }
  }

  const inputs = [
    {
      text: "Username",
      id: "input-username"
    },
    {
      text: "Password",
      id: "input-password",
      attributes: {
        type: "password",
      }
    }
  ]

  return (
    <Form inputs={inputs} onAsyncSubmit={onSubmit} submitText="Login" />
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
