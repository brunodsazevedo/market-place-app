import { Platform } from 'react-native'
import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserStore } from '../store/user-store'

const getBaseURL = () => {
  return Platform.select({
    ios: 'http://localhost:3001',
    android: 'http://192.168.1.80:3001',
  })
}

export const baseURL = getBaseURL()
export class MarketPLaceApiClient {
  private instance: AxiosInstance
  private isRefreshing: boolean = false

  constructor() {
    this.instance = axios.create({
      baseURL,
    })

    this.setupInterceptors()
  }

  getInstance() {
    return this.instance
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem('maketplace-auth')

        console.log('userData', userData)

        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData)

          console.log(token)

          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (
          error.response?.status === 401 &&
          error.response?.data?.message === 'Token expirado' &&
          !this.isRefreshing
        ) {
          this.isRefreshing = true

          try {
            const userData = await AsyncStorage.getItem('maketplace-auth')

            if (!userData) {
              throw new Error('Usuário não autenticado')
            }

            const {
              state: { refreshToken },
            } = JSON.parse(userData)

            if (!refreshToken) {
              throw new Error('Refresh token não encontrado')
            }

            const { data: response } = await this.instance.post(
              '/auth/refresh',
              { refreshToken },
            )

            const currentUserData = JSON.parse(userData)

            currentUserData.state.token = response.token
            currentUserData.state.refreshToken = response.refreshToken

            await AsyncStorage.setItem(
              'maketplace-auth',
              JSON.stringify(currentUserData),
            )

            originalRequest.headers.Authorization = `Bearer ${response.token}`

            return this.instance(originalRequest)
          } catch {
            this.handleUnauthorized()

            return Promise.reject(
              new Error('Sessão expirada. Por favor, faça login novamente.'),
            )
          } finally {
            this.isRefreshing = false
          }
        }

        if (error.response && error.response.data) {
          return Promise.reject(new Error(error.response.data.message))
        } else {
          return Promise.reject(new Error('Ocorreu um erro inesperado.'))
        }
      },
    )
  }

  private async handleUnauthorized() {
    const { logout } = useUserStore.getState()

    delete this.instance.defaults.headers.common['Authorization']
    logout()
  }
}

export const marketPlaceApiClient = new MarketPLaceApiClient().getInstance()
