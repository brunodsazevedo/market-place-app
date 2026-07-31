import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useRegisterMutation } from '@/shared/queries/auth/use-register.mutation'

import { useUserStore } from '@/shared/store/user-store'

import { useAppModal } from '@/shared/hooks/useAppModal'
import { useCamera } from '@/shared/hooks/useCamera'
import { useGallery } from '@/shared/hooks/useGallery'

import { RegisterFormData, registerScheme } from './register.scheme'

export function useRegisterViewModel() {
  const userRegisterMutation = useRegisterMutation()
  const { setSession } = useUserStore()
  const modals = useAppModal()
  const { openCamera } = useCamera({})
  const { openGallery } = useGallery({})

  const handleSelectAvatar = () => {
    modals.showSelection({
      title: 'Selecionar foto',
      message: 'Escolha uma opção:',
      options: [
        {
          text: 'Galeria',
          icon: 'images',
          variant: 'primary',
          onPress: async () => {
            const imageUri = await openGallery()
            console.log(imageUri)
          },
        },
        {
          text: 'Câmera',
          icon: 'camera',
          variant: 'primary',
          onPress: openCamera,
        },
      ],
    })
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
    errors,
    handleSelectAvatar,
    onSubmit,
  }
}
