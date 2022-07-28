import { useForm } from "react-hook-form"
import { useState } from "react"

/*
  inputs = [
    {
      text: Password,
      id: input-password,
      attribute: {
        type: "password"
      }
    },
  ]
*/

const Form = ({ inputs, onAsyncSubmit, submitText }) => {
  const { register, handleSubmit, formState, reset } = useForm({ shouldFocusError: false, mode: "onChange" })
  const { isValid } = formState
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data) => {
    setIsLoading(true)
    const isSuccess = await onAsyncSubmit(data)
    if (isSuccess) reset()
    setIsLoading(false)
  }

  // const FormButton = ({ text, onClick, isSubmit = false }) => {
  //   if (isSubmit) {
  //     return (
  //       <button type="submit" disabled={!isValid || isLoading}>{text}</button>
  //     )
  //   } else {
  //     return (
  //       <button onClick={onClick}>{text}</button>
  //     )
  //   }
  // }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(i => <FormInput register={register} key={i.id} text={i.text} id={i.id} attributes={i.attributes} />)}
      <button type="submit" disabled={!isValid || isLoading}>{submitText}</button>
    </form>
  )
}

const FormInput = ({ text, id, attributes = {}, register }) => (
  <div>
    {text}
    <br />
    <input {...attributes} {...register(id, { required: true })} />
  </div>
)

export default Form
