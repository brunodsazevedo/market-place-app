import { Platform } from 'react-native'
import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
  }
}

export const marketPlaceApiClient = new MarketPLaceApiClient().getInstance()
