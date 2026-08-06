import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegisterMutation } from '@/shared/queries/auth/use-register.mutation'

import { useUserStore } from '@/shared/store/user-store'

import { useImage } from '@/shared/hooks/useImage'

import { RegisterFormData, registerScheme } from './register.scheme'
import { CameraType } from 'expo-image-picker'

export function useRegisterViewModel() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  const userRegisterMutation = useRegisterMutation()
  const { setSession } = useUserStore()
  const { handleSelectImage } = useImage({
    callback: setAvatarUri,
    cameraType: CameraType.front,
  })

  const handleSelectAvatar = () => {
    handleSelectImage()
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerScheme),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
  })

  const onSubmit = handleSubmit(async (userData) => {
    const registerData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone,
      avatarUri: avatarUri || undefined,
    }

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
    avatarUri,
    errors,
    handleSelectAvatar,
    onSubmit,
  }
}
