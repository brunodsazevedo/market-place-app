import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegisterMutation } from '@/shared/queries/auth/user-register.mutation'

import { RegisterFormData, registerScheme } from './register.scheme'

export function useRegisterViewModel() {
  const userRegisterMutation = useRegisterMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: 'Bruno',
      email: 'bruno-app@test.com',
      password: '123123',
      confirmPassword: '123123',
      phone: '12999999999',
    },
  })

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData
    await userRegisterMutation.mutateAsync(registerData)
  })

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  }
}
