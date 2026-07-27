import { marketPlaceApiClient } from '../api/market-place-api'

import { LoginHttpParams } from '../interfaces/http/login'
import { RegisterHttpParams } from '../interfaces/http/register'
import { AuthResponse } from '../interfaces/http/auth-response'

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
