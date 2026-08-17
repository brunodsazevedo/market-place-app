import { marketPlaceApiClient } from '@/shared/api/market-place-api'

import { ProductResponse } from '@/shared/interfaces/http/product-response'

interface ProductRequest {
  pagination: {
    page: number
    perPage: number
  }
  filters: {
    from: Date
    to: Date
    categoryIds: number[]
    searchText: string
    minValue: number
    maxValue: number
  }
  sort: {
    averageRating: string
  }
}

export const getProducts = async (params: ProductRequest) => {
  const { data } = await marketPlaceApiClient.post<ProductResponse>(
    '/products',
    params,
  )

  return data
}
