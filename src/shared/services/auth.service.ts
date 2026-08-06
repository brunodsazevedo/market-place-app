import { marketPlaceApiClient } from '../api/market-place-api'

import { LoginHttpParams } from '../interfaces/http/login'
import { RegisterHttpParams } from '../interfaces/http/register'
import { AuthResponse } from '../interfaces/http/auth-response'

export const register = async (userData: RegisterHttpParams) => {
  const formData = new FormData()

  formData.append('name', userData.name)
  formData.append('email', userData.email)
  formData.append('tel', userData.phone)
  formData.append('password', userData.password)

  if (userData.avatarUri) {
    formData.append('avatar', {
      uri: userData.avatarUri,
      type: 'image/jpeg',
      name: 'avatar.jpeg',
    } as unknown as Blob)
  }

  const { data } = await marketPlaceApiClient.post<AuthResponse>(
    '/users',
    formData,
  )

  return data
}

export const login = async (userData: LoginHttpParams) => {
  const { data } = await marketPlaceApiClient.post<AuthResponse>(
    '/sessions',
    userData,
  )

  return data
}
