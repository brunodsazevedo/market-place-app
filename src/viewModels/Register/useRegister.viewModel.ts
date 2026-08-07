import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegisterMutation } from '@/shared/queries/auth/use-register.mutation'

import { useImage } from '@/shared/hooks/useImage'

import { RegisterFormData, registerScheme } from './register.scheme'
import { CameraType } from 'expo-image-picker'

export function useRegisterViewModel() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  const { handleSelectImage } = useImage({
    callback: setAvatarUri,
    cameraType: CameraType.front,
  })

  const userRegisterMutation = useRegisterMutation()

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

    await userRegisterMutation.mutateAsync(registerData)
  })

  return {
    isLoading: userRegisterMutation.isPending,
    control,
    avatarUri,
    errors,
    handleSelectAvatar,
    onSubmit,
  }
}
