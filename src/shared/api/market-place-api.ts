import { Platform } from 'react-native'
import axios, { AxiosInstance } from 'axios'

const getBaseURL = () => {
  return Platform.select({
    ios: 'http://localhost:3001',
    android: 'http://192.168.1.80:3001',
  })
}

const baseURL = getBaseURL()
export class MarketPLaceApiClient {
  private instance: AxiosInstance
  private isRefreshing: boolean = false

  constructor() {
    this.instance = axios.create({
      baseURL,
    })
  }

  getInstance() {
    return this.instance
  }
}

export const marketPlaceApiClient = new MarketPLaceApiClient().getInstance()
