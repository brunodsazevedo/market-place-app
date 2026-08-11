import { baseURL, marketPlaceApiClient } from '@/shared/api/market-place-api'

import { LoginHttpParams } from '@/shared/interfaces/http/login'
import { RegisterHttpParams } from '@/shared/interfaces/http/register'
import { AuthResponse } from '@/shared/interfaces/http/auth-response'
import { UploadAvatarResponse } from '@/shared/interfaces/http/upload-avatar'

export const register = async (userData: RegisterHttpParams) => {
  const { data } = await marketPlaceApiClient.post<AuthResponse>(
    '/auth/register',
    userData,
  )

  return data
}

export const login = async (userData: LoginHttpParams) => {
  const { data } = await marketPlaceApiClient.post<AuthResponse>(
    '/auth/login',
    userData,
  )

  return data
}

export const uploadAvatar = async (avatarUri: string) => {
  const formData = new FormData()

  formData.append('avatar', {
    uri: avatarUri,
    type: 'image/jpeg',
    name: 'avatar.jpeg',
  } as unknown as Blob)

  const { data } = await marketPlaceApiClient.post<UploadAvatarResponse>(
    '/user/avatar',
    formData,
  )

  data.url = `${baseURL}${data.url}`

  return data
}
