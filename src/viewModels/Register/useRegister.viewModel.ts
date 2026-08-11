import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CameraType } from 'expo-image-picker'

import { useRegisterMutation } from '@/shared/queries/auth/use-register.mutation'

import { useImage } from '@/shared/hooks/useImage'

import { useUserStore } from '@/shared/store/user-store'

import { RegisterFormData, registerScheme } from './register.scheme'
import { useUploadAvatarMutation } from '@/shared/queries/auth/use-upload-avatar.mutation'

export function useRegisterViewModel() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null)

  const { updateUser } = useUserStore()

  const { handleSelectImage } = useImage({
    callback: setAvatarUri,
    cameraType: CameraType.front,
  })

  const uploadAvatarMutation = useUploadAvatarMutation()

  const userRegisterMutation = useRegisterMutation({
    onSuccess: async () => {
      if (avatarUri) {
        const { url } = await uploadAvatarMutation.mutateAsync(avatarUri)
        console.log({ url })

        updateUser({ avatarUrl: url })
      }
    },
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
