import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginScheme, LoginFormData } from './login.scheme'
import { useLoginMutation } from '@/shared/queries/auth/use-login.mutation'

export const useLoginViewModel = () => {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(loginScheme),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLoginMutation()

  const onSubmit = handleSubmit(async (userFormData) => {
    const userData = await loginMutation.mutateAsync(userFormData)

    console.log(userData)
  })

  return { control, onSubmit }
}
