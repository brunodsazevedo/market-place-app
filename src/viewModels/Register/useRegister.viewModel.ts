import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegisterMutation } from '@/shared/queries/auth/user-register.mutation'

import { useUserStore } from '@/shared/store/user-store'

import { RegisterFormData, registerScheme } from './register.scheme'

export function useRegisterViewModel() {
  const userRegisterMutation = useRegisterMutation()
  const { setSession } = useUserStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: 'Jose',
      email: 'bruno-zustand@test.com',
      password: '123123',
      confirmPassword: '123123',
      phone: '11999999999',
    },
  })

  const onSubmit = handleSubmit(async (userData) => {
    const { confirmPassword, ...registerData } = userData
    const mutationResponse =
      await userRegisterMutation.mutateAsync(registerData)
    setSession({
      user: mutationResponse.user,
      token: mutationResponse.token,
      refreshToken: mutationResponse.refreshToken,
    })
  })

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
  }
}
