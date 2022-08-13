import { useDispatch } from "react-redux"
import { login } from "../../state/userReducer"
import { notify, Type as notifyType } from "../../state/notificationReducer"
import SessionService from "../../services/session"
import Form from "../Form"
import { useNavigate } from "react-router-dom"

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await SessionService.register(
        data["input-username"],
        data["input-password"]
      )
      const user = await SessionService.login(
        data["input-username"],
        data["input-password"]
      )
      dispatch(login(user))
      navigate(`/users/${user.id}`)
      return true
    } catch (error) {
      if (error.name === "AxiosError") {
        if (error.request?.response) {
          dispatch(notify(JSON.parse(error.request?.response).error))
        } else {
          dispatch(notify(error.message))
        }
      } else {
        dispatch(notify("Error registering", notifyType.Error))
      }
      return false
    }
  }

  const inputs = [
    {
      text: "Username",
      id: "input-username",
    },
    {
      text: "Password",
      id: "input-password",
      attributes: {
        type: "password",
      },
    },
  ]

  return <Form inputs={inputs} onAsyncSubmit={onSubmit} submitText="Register" />
}

const RegisterView = () => {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm />
    </>
  )
}

export default RegisterView
