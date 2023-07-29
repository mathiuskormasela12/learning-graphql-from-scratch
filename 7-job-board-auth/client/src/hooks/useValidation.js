// ========= Use Job
// import all packages
import { useForm } from 'react-hook-form'

export const useValidation = (defaultValues) => {
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues
  })

  return {
    control,
    handleSubmit,
    errors,
    register
  }
}
