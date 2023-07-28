// ========= Use Job
// import all packages
import { useForm } from 'react-hook-form'

export const useJob = () => {
  const { control, register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: ''
    }
  })

  return {
    control,
    handleSubmit,
    errors,
    register
  }
}
