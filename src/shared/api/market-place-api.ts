import axios, { AxiosInstance } from 'axios'

export class MarketPLaceApiClient {
  private instance: AxiosInstance
  private isRefreshing: boolean = false

  constructor() {
    this.instance = axios.create({
      baseURL: '',
    })
  }

  getInstance() {
    return this.instance
  }
}

export const marketPlaceApiClient = new MarketPLaceApiClient().getInstance()
